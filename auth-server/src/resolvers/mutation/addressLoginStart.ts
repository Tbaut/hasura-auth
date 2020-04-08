// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import AuthService from '../../services/auth';
import { AddressLoginStartType } from '../../types';
import messages from '../../utils/messages';

interface argsType {
	address: string
}

export default async (parent, { address }: argsType): Promise<AddressLoginStartType>  => {
	const authServiceInstance = new AuthService();

	return {
		message: messages.ADDRESS_LOGIN_STARTED,
		signMessage: await authServiceInstance.AddressLoginStart(address)
	};
};
