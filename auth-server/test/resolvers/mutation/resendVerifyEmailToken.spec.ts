// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { expect } from 'chai';
import { AuthenticationError } from 'apollo-server';
import 'mocha';

import User from '../../../src/model/User';
import EmailVerificationToken from '../../../src/model/EmailVerificationToken';
import resendVerifyEmailToken from '../../../src/resolvers/mutation/resendVerifyEmailToken';
import { Context } from '../../../src/types';
import messages from '../../../src/utils/messages';
import { getNewUserCtx } from '../../helpers';

describe('resendVerifyEmailToken mutation', () => {
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
	});

	after(async () => {
		await User
			.query()
			.where({ id: signupUserId })
			.del();
	});

	it('should be able to resend verify email token', async () => {
		await resendVerifyEmailToken(undefined, undefined, fakectx);

		const verifyToken = await EmailVerificationToken
			.query()
			.where({ user_id: signupUserId })
			.orderBy('id', 'desc')
			.first();

		expect(verifyToken).to.exist;
		expect(verifyToken?.valid).to.be.true;
		expect(verifyToken?.token).to.be.a('string');
	});

	it('should not be able to resend verify email token with wrong jwt', async () => {
		fakectx.req.headers.authorization = 'Bearer wrong';
		try {
			await resendVerifyEmailToken(undefined,undefined, fakectx);
		} catch (error) {
			expect(error).to.exist;
			expect(error).to.be.an.instanceof(AuthenticationError);
			expect(error.message).to.eq(messages.INVALID_JWT);
		}
	});
});
