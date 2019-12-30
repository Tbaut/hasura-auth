import AuthService from '../../services/auth'
import messages from '../../utils/messages'

interface argsType {
	token: string
}

export default async (parent, { token }: argsType) => {
	const authServiceInstance = new AuthService()
	const updatedJWT = await authServiceInstance.VerifyEmail(token)

	return { message: messages.EMAIL_VERIFICATION_SUCCESSFUL, token: updatedJWT }
}