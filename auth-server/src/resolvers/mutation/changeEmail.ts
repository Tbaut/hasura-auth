import { UserInputError } from 'apollo-server';

import AuthService from '../../services/auth';
import { ChangeResponseType, Context } from '../../types';
import getTokenFromReq from '../../utils/getTokenFromReq';
import messages from '../../utils/messages';
import validateEmail from '../../utils/validateEmail';

interface argsType {
	email: string
}

export default async (parent, { email }: argsType, ctx: Context): Promise<ChangeResponseType> => {
	const token = getTokenFromReq(ctx.req);

	if (!validateEmail(email)) {
		throw new UserInputError(messages.INVALID_EMAIL);
	}

	const authServiceInstance = new AuthService();
	const updatedJWT = await authServiceInstance.ChangeEmail(token, email);

	return { message: messages.EMAIL_CHANGE_REQUEST_SUCCESSFUL, token: updatedJWT };
};