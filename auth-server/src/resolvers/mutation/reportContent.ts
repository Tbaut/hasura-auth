import { UserInputError } from 'apollo-server';

import ContentReport from '../../model/ContentReport';
import AuthService from '../../services/auth';
import { Context, MessageType } from '../../types';
import getTokenFromReq from '../../utils/getTokenFromReq';
import messages from '../../utils/messages';

interface argsType {
	type: string
	content_id: number
	reason: string
}

export default async (parent, { type, content_id, reason }: argsType, ctx: Context): Promise<MessageType>  => {
	const token = getTokenFromReq(ctx.req);
	const authServiceInstance = new AuthService();
	const user = await authServiceInstance.GetUser(token);

	if (['post', 'comment'].includes(type) === false) {
		throw new UserInputError(messages.REPORT_TYPE_INVALID);
	}

	await ContentReport
		.query()
		.allowInsert('[type, content_id, user_id, reason, resolved]')
		.insert({
			type,
			content_id,
			user_id: user.id,
			reason,
			resolved: false
		});

	return { message: messages.CONTENT_REPORT_SUCCESSFUL };
};
