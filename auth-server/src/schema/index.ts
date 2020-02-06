import { gql } from 'apollo-server-express';

import userQuery from './query/user';
import usersQuery from './query/users';
import subscription from './query/subscription';
import tokenQuery from './query/token';

import addressLinkConfirm from './mutation/addressLinkConfirm';
import addressLinkStart from './mutation/addressLinkStart';
import addressUnlink from './mutation/addressUnlink';
import changeUsernameMutation from './mutation/changeUsername';
import changeEmailMutation from './mutation/changeEmail';
import changePasswordMutation from './mutation/changePassword';
import changeNameMutation from './mutation/changeName';
import loginMutation from './mutation/login';
import logoutMutation from './mutation/logout';
import postSubscribe from './mutation/postSubscribe';
import postUnsubscribe from './mutation/postUnsubscribe';
import requestResetPassword from './mutation/requestResetPassword';
import resetPassword from './mutation/resetPassword';
import signupMutation from './mutation/signup';
import undoEmailChange from './mutation/undoEmailChange';
import verifyEmail from './mutation/verifyEmail';

import addressLinkType from './type/addressLinkType';
import address from './type/address';
import changeResponseType from './type/changeResponse';
import loginResponseType from './type/loginResponse';
import messageType from './type/message';
import publicUser from './type/publicUser';
import subscriptionType from './type/subscription';
import tokenType from './type/token';
import undoEmailChangeResponse from './type/undoEmailChangeResponse';
import userType from './type/user';

export default gql`
	${addressLinkType}
	${address}
	${changeResponseType}
	${loginResponseType}
	${messageType}
	${publicUser}
	${subscriptionType}
	${tokenType}
	${undoEmailChangeResponse}
	${userType}

	type Query {
		${subscription}
		${tokenQuery}
		${userQuery}
		${usersQuery}
	}

	type Mutation {
		${addressLinkConfirm}
		${addressLinkStart}
		${addressUnlink}
		${changeUsernameMutation}
		${changeEmailMutation}
		${changePasswordMutation}
		${changeNameMutation}
		${loginMutation}
		${logoutMutation}
		${postSubscribe}
		${postUnsubscribe}
		${requestResetPassword}
		${resetPassword}
		${signupMutation}
		${undoEmailChange}
		${verifyEmail}
	}
`;
