import user from './query/user'
import users from './query/users'
import token from './query/token'
import login from './mutation/login'
import logout from './mutation/logout'
import signup from './mutation/signup'
import changeEmail from './mutation/changeEmail'
import changePassword from './mutation/changePassword'
import changeName from './mutation/changeName'
import verifyEmail from './mutation/verifyEmail'

export default {
	Query: {
		user,
		users,
		token
	},
	Mutation: {
		login,
		logout,
		signup,
		changeEmail,
		changePassword,
		changeName,
		verifyEmail
	}
}
