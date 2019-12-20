import { UserInputError } from 'apollo-server'


import AuthService from '../../services/auth'
import { Context } from '../../types'
import getTokenFromReq from '../../utils/getTokenFromReq'
import messages from '../../utils/messages'
import validateEmail from '../../utils/validateEmail'

export default async (_, args, ctx: Context) => {
	const token = getTokenFromReq(ctx.req)
	const { email } = args
	
	if (!validateEmail(email)) {
		throw new UserInputError(messages.INVALID_EMAIL)
	}

	const authServiceInstance = new AuthService()
	await authServiceInstance.ChangeEmail(token, email)

	return { message: 'Email changed. Verification request sent to your email address.' }
}