// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { UserInputError } from 'apollo-server';

import messages from './messages';

export default (username: string): void => {
	const regexp = /^[A-Za-z0-9._-]{3,30}$/;

	if (!regexp.test(username)) {
		throw new UserInputError(messages.USERNAME_INVALID_ERROR);
	}
};
