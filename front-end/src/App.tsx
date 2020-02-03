import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@xstyled/styled-components';

import Apollo from './components/Apollo';
import { GlobalStyle } from './ui-components/GlobalStyle';
import Modal from './components/Modal';
import Notifications from './components/Notifications';
import { ModalProvider } from './context/ModalContext';
import { NotificationProvider } from './context/NotificationContext';
import { UserDetailsProvider } from './context/UserDetailsContext';
import CreatePost from './screens/CreatePost';
import Discussions from './screens/Discussions';
import Home from './screens/Home';
import LoginForm from './screens/LoginForm';
import MenuBar from './screens/MenuBar';
import NotFound from './screens/NotFound';
import PostDiscussion from './screens/DiscussionPost';
import OnChain from './screens/OnChain';
import PostProposal from './screens/ProposalPost';
import PostReferendum from './screens/ReferendumPost';
import RequestResetPassword from './screens/RequestResetPassword';
import ResetPassword from './screens/RequestResetPassword/ResetPassword';
import Settings from './screens/Settings';
import SignupForm from './screens/SignupForm';
import VerifyEmail from './screens/VerifyEmail';
import UndoEmailChange from './screens/UndoEmailChange';
import { theme } from './themes/theme';

const App = () => {

	return (
		<>
			<Router>
				<ThemeProvider theme={theme}>
					<NotificationProvider>
						<ModalProvider>
							<UserDetailsProvider>
								<Apollo>
									<MenuBar />
									<GlobalStyle />
									<Notifications/>
									<Modal/>
									<Switch>
										<Route exact path="/">
											<Home/>
										</Route>
										<Route path="/discussions">
											<Discussions/>
										</Route>
										<Route path="/login">
											<LoginForm/>
										</Route>
										<Route path="/post/create" >
											<CreatePost/>
										</Route>
										<Route exact path="/proposal/:id" >
											<PostProposal/>
										</Route>
										<Route exact path="/referendum/:id" >
											<PostReferendum/>
										</Route>
										<Route exact path="/post/:id" >
											<PostDiscussion/>
										</Route>
										<Route path="/onchain" >
											<OnChain/>
										</Route>
										<Route path="/request-reset-password">
											<RequestResetPassword/>
										</Route>
										<Route path="/reset-password/:token">
											<ResetPassword/>
										</Route>
										<Route path="/signup">
											<SignupForm/>
										</Route>
										<Route path="/verify-email/:token">
											<VerifyEmail/>
										</Route>
										<Route path="/undo-email-change/:token">
											<UndoEmailChange/>
										</Route>
										<Route path="/settings">
											<Settings/>
										</Route>
										<Route path="*">
											<NotFound/>
										</Route>
									</Switch>
								</Apollo>
							</UserDetailsProvider>
						</ModalProvider>
					</NotificationProvider>
				</ThemeProvider>
			</Router>
		</>
	);
};

export default App;