// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import User from '../../model/User';
import { PublicUser, UsersArgs } from '../../types';

export default async (parent: void, { limit, page }: UsersArgs): Promise<PublicUser[]> => {
	limit = limit || 25;
	page = page || 1;
	if (page < 1) {
		page = 1;
	}
	if (limit > 100) {
		limit = 100;
	}
	const offset = (page - 1) * limit;
	const users = await User.query().offset(offset).limit(limit);

	return Array.isArray(users) ? users.map(user => ({
		id: user.id,
		name: user.name,
		username: user.username
	})) : [];
};
