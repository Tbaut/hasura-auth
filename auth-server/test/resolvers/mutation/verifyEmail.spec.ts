// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { AuthenticationError } from 'apollo-server';
import { expect } from 'chai';
import 'mocha';
import { uuid } from 'uuidv4';

import EmailVerificationToken from '../../../src/model/EmailVerificationToken';
import User from '../../../src/model/User';
import verifyEmail from '../../../src/resolvers/mutation/verifyEmail';
import { Context } from '../../../src/types';
import messages from '../../../src/utils/messages';
import { getNewUserCtx } from '../../helpers';

describe('verifyEmail mutation', () => {
	let verifyToken: any;
	let fakectx: Context;
	let signupUserId = -1;

	const email = 'test@email.com';
	const password = 'testpass';
	const username = 'testuser';
	const name = 'test name';

	before(async () => {
		const result = await getNewUserCtx(email, password, username, name);
		fakectx = result.ctx;
		signupUserId = result.userId;

		verifyToken = await EmailVerificationToken
			.query()
			.allowInsert('[token, user_id, valid]')
			.insert({
				token: uuid(),
				user_id: signupUserId,
				valid: true
			});
	});

	after(async () => {
		await User
			.query()
			.where({ id: signupUserId })
			.del();

		await EmailVerificationToken
			.query()
			.where({ id: verifyToken?.id })
			.del();
	});

	it('should be able to verify email with valid token', async () => {
		const res = await verifyEmail(undefined, { token: verifyToken?.token });

		const dbUser = await User
			.query()
			.where({ id: signupUserId })
			.first();

		expect(dbUser?.email_verified).to.be.true;
		expect(res.message).to.eq(messages.EMAIL_VERIFICATION_SUCCESSFUL);
		expect(res.token).to.exist;
	});

	it('should throw an error if token is invalid', async () => {
		try {
			await verifyEmail(undefined, { token: uuid() });
		} catch (error) {
			expect(error).to.exist;
			expect(error).to.be.an.instanceof(AuthenticationError);
			expect(error.message).to.eq(messages.EMAIL_VERIFICATION_TOKEN_NOT_FOUND);
		}
	});
});
