// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import 'mocha';
import { expect } from 'chai';

import users from '../../../src/resolvers/query/users';
import User from '../../../src/model/User';

describe('users query', () => {
	let dbUsers: User[] = [];
	const email = 'test@email.com';
	const password = 'testpass';
	const salt = 'testsalt';
	const username = 'testuser';
	const name = 'test name';
	const email_verified = false;

	before(async () => {
		for (let i = 0; i < 102; i++) {
			dbUsers.push(await User
				.query()
				.allowInsert('[email, password, username, name]')
				.insert({
					email: `${i}_${email}`,
					password,
					salt,
					username: `${i}_${username}`,
					name,
					email_verified
				})
				.returning('*')
			);
		}
	});

	after(async () => {
		await User
			.query()
			.whereIn('id', dbUsers.map(user => user.id))
			.del();
	});

	it('should return users with limit', async () => {
		const result = await users(undefined, { limit: 5, page: 1 });
		result.forEach((user, i) => {
			// eslint-disable-next-line security/detect-object-injection
			expect(user.id).to.equals(dbUsers[i].id);
		});
	});

	it('should return users for a particular page', async () => {
		const result = await users(undefined, { limit: 5, page: 2 });

		result.forEach((user, i) => {
			expect(user.id).to.equals(dbUsers[i + 5].id);
		});
	});

	it('should limit users to 100 if > 100 is requested', async () => {
		const result = await users(undefined, { limit: 101, page: 1 });

		expect(result.length).to.equal(100);
	});
});
