// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import AuthService from '../../services/auth';
import { Context, ChangeResponseType } from '../../types';
import getTokenFromReq from '../../utils/getTokenFromReq';
import messages from '../../utils/messages';

interface argsType {
	address: string
}

export default async (parent, { address }: argsType, ctx: Context): Promise<ChangeResponseType>  => {
	const token = getTokenFromReq(ctx.req);
	const authServiceInstance = new AuthService();

	const updatedJWT = await authServiceInstance.AddressUnlink(token, address);

	return { message: messages.ADDRESS_UNLINKING_SUCCESS, token: updatedJWT };
};
