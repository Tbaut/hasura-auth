// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import AuthService from '../../services/auth';
import { AddressDefaultStartArgs, Context, MessageType } from '../../types';
import getTokenFromReq from '../../utils/getTokenFromReq';
import messages from '../../utils/messages';

export default async (parent: void, { address }: AddressDefaultStartArgs, ctx: Context): Promise<MessageType> => {
	const token = getTokenFromReq(ctx.req);
	const authServiceInstance = new AuthService();

	await authServiceInstance.AddressDefault(token, address);

	return {
		message: messages.ADDRESS_DEFAULT_SUCCESS
	};
};