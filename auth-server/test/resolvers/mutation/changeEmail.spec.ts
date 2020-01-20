import { AuthenticationError, UserInputError, ForbiddenError } from 'apollo-server';
import { expect } from 'chai';
import 'mocha';

import EmailVerificationToken from '../../../src/model/EmailVerificationToken';
import UndoEmailChangeToken from '../../../src/model/UndoEmailChangeToken';
import User from '../../../src/model/User';
import signup from '../../../src/resolvers/mutation/signup';
import changeEmail from '../../../src/resolvers/mutation/changeEmail';
import { Context } from '../../../src/types';
import messages from '../../../src/utils/messages';

describe('changeEmail mutation', () => {
	let signupResult;
	const fakectx: Context = {
		req: {
			headers: {}
		},
		res: {
			cookie: () => {}
		}
	} as any;
	const email = 'test@email.com';
	const password = 'testpass';
	const username = 'testuser';
	const name = 'test name';

	before(async () => {
		signupResult = await signup(null, { email, password, username, name }, fakectx);
		fakectx.req.headers.authorization = `Bearer ${signupResult.token}` // eslint-disable-line
	});

	after(async () => {
		await User
			.query()
			.where({ id: signupResult.user.id })
			.del();

		await EmailVerificationToken
			.query()
			.where({ user_id: signupResult.user.id })
			.del();

		await UndoEmailChangeToken
			.query()
			.where( { user_id: signupResult.user.id })
			.del();
	});

	it('should allow to change an email', async () => {
		const email = 'blabla@blou.de';

		await changeEmail(null, { email }, fakectx);

		const verifyToken = await EmailVerificationToken
			.query()
			.where({ user_id: signupResult.user.id, valid: true });

		const undoToken = await UndoEmailChangeToken
			.query()
			.where({ user_id: signupResult.user.id, valid: true });

		expect(verifyToken.length).to.eq(1);
		expect(verifyToken[0].token).to.not.be.empty;

		expect(undoToken.length).to.eq(1);
		expect(undoToken[0].token).to.not.be.empty;
	});

	it('should not be able to change email with an invalid jwt', async () => {
		const email = 'blabla@blou.de';
		fakectx.req.headers.authorization = 'Bearer wrong';
		try {
			await changeEmail(null, { email }, fakectx);
		} catch (error) {
			expect(error).to.exist;
			expect(error).to.be.an.instanceof(AuthenticationError);
			expect(error.message).to.eq(messages.INVALID_JWT);
		}
		fakectx.req.headers.authorization = `Bearer ${signupResult.token}` // eslint-disable-line
	});

	it('should not be able to change email with an invalid email', async () => {
		const email = 'wrong@email';

		try {
			await changeEmail(null, { email }, fakectx);
		} catch (error) {
			expect(error).to.exist;
			expect(error).to.be.an.instanceof(UserInputError);
			expect(error.message).to.eq(messages.INVALID_EMAIL);
		}
	});

	it('should not be able to change email before 48 hours and undotoken valid', async () => {
		const email = 'blabla2@blou.de';

		try {
			await changeEmail(null, { email }, fakectx);
		} catch (error) {
			expect(error).to.exist;
			expect(error).to.be.an.instanceof(ForbiddenError);
			expect(error.message).to.eq(messages.EMAIL_CHANGE_NOT_ALLOWED_YET);
		}
	});

	it('should be able to change email after 48 hours', async () => {
		const email = 'blabla2@blou.de';

		await UndoEmailChangeToken
			.query()
			.patch({
				created_at: new Date(Date.now() - 49 * 60 * 60 * 1000).toISOString() // now + 6 months
			})
			.where( { user_id: signupResult.user.id });

		const { message, token } = await changeEmail(null, { email }, fakectx);

		expect(token).to.exist;
		expect(message).to.equal(messages.EMAIL_CHANGE_REQUEST_SUCCESSFUL);
	});
});
