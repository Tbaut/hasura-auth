import React, { useContext } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Grid, Icon, Popup } from 'semantic-ui-react';
import styled from '@xstyled/styled-components';

import { ModalContext } from '../../context/ModalContext';
import { UserDetailsContext } from '../../context/UserDetailsContext';
import { useSignupMutation } from '../../generated/graphql';
import { useRouter } from '../../hooks';
import { handleLoginUser } from '../../services/auth.service';
import Button from '../../ui-components/Button';
import FilteredError from '../../ui-components/FilteredError';
import { Form } from '../../ui-components/Form';
import messages from '../../util/messages';

interface Props {
	className?: string
}

const SignupForm = ({ className }:Props): JSX.Element => {
	const { history } = useRouter();
	const currentUser = useContext(UserDetailsContext);
	const [signupMutation, { loading, error }] = useSignupMutation();
	const { errors, handleSubmit, register } = useForm();

	const { setModal } = useContext(ModalContext);

	const handleSubmitForm = (data:Record<string, any>):void => {
		const { email, name, password, username } = data;

		if (username && password){
			signupMutation({
				variables: {
					email,
					name,
					password,
					username
				}
			})
				.then(({ data }) => {
					if (data && data.signup && data.signup.token && data.signup.user) {
						handleLoginUser({ token: data.signup.token, user: data.signup.user }, currentUser);
						if (email) {
							setModal({ content: 'We sent you an email to verify your address. Click on the link in the email.' ,title: 'You\'ve got some mail' });
						}
						history.push('/');
					}}

				).catch((e) => {
					console.error('Login error', e);
				});
		}
	};

	return (
		<Grid className={className}>
			<Grid.Column only='tablet computer' tablet={2} computer={4} largeScreen={5} widescreen={5}/>
			<Grid.Column mobile={16} tablet={12} computer={8} largeScreen={6} widescreen={6}>
				<Form onSubmit={handleSubmit(handleSubmitForm)}>
					<h3>Sign Up</h3>
					<Form.Group>
						<Form.Field width={16}>
							<label>Username</label>
							<input
								className={errors.username ? 'error' : ''}
								name='username'
								placeholder='john'
								ref={register({ maxLength:20, minLength:3, pattern: /^[A-Za-z0-9._-]*$/, required: true })}
								type='text'
							/>
							{(errors.username as FieldError)?.type === 'maxLength' && <span className={'errorText'}>{messages.VALIDATION_USERNAME_MAXLENGTH_ERROR}</span>}
							{(errors.username as FieldError)?.type === 'minLength' && <span className={'errorText'}>{messages.VALIDATION_USERNAME_MINLENGTH_ERROR}</span>}
							{(errors.username as FieldError)?.type === 'pattern' && <span className={'errorText'}>{messages.VALIDATION_USERNAME_PATTERN_ERROR}</span>}
							{(errors.username as FieldError)?.type === 'required' && <span className={'errorText'}>{messages.VALIDATION_USERNAME_REQUIRED_ERROR}</span>}
						</Form.Field>
					</Form.Group>
					<Form.Group>
						<Form.Field width={16}>
							<label>
								Display Name&nbsp;
								<Popup
									trigger={<Icon name='question circle'/>}
									content='We only use your display name as a more readable alternative to your username.'
									style={{ fontSize: '1.2rem', marginLeft: '-1rem' }}
									hoverable={true}
								/>
							</label>
							<input
								className={errors.name ? 'error' : ''}
								name='name'
								placeholder='Firstname Lastname'
								type='text'
								ref={register({ required: false })}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Group>
						<Form.Field width={16}>
							<label>
								Email&nbsp;
								<Popup
									trigger={<Icon name='question circle'/>}
									content='We only use your email for password recovery and to receive notifications if you wish to opt-in.'
									style={{ fontSize: '1.2rem', marginLeft: '-1rem' }}
									hoverable={true}
								/>
							</label>
							<input
								className={errors.email ? 'error' : ''}
								name='email'
								placeholder='john@doe.com'
								ref={register({
									pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
								})}
								type='text'
							/>
							{errors.email && <span className={'errorText'}>{messages.VALIDATION_EMAIL_ERROR}</span>}
							<div className="text-muted">
								We&apos;ll never share your email with anyone else.
							</div>
						</Form.Field>
					</Form.Group>
					<Form.Group>
						<Form.Field width={16}>
							<label>Password</label>
							<input
								className={errors.password ? 'error' : ''}
								name='password'
								placeholder='Password'
								ref={register({ minLength: 6, required: true })}
								type='password'
							/>
							{errors.password && <span className={'errorText'}>{messages.VALIDATION_PASSWORD_ERROR}</span>}
						</Form.Field>
					</Form.Group >
					<Form.Field>
						<label className='checkbox-label'>
							<input
								className={errors.termsandconditions ? 'error' : ''}
								name='termsandconditions'
								value='yes'
								ref={register({ required: true })}
								type='checkbox'
							/>
							I agree to the <Link to='/terms-and-conditions'>Terms and Conditions</Link>
						</label>
						{errors.termsandconditions && <div className={'errorText'}>Please accept the Terms and Conditions.</div>}
					</Form.Field>
					<Form.Field>
						<label className='checkbox-label'>
							<input
								className={errors.privacypolicy ? 'error' : ''}
								id='pp_checkbox'
								name='privacypolicy'
								value='yes'
								ref={register({ required: true })}
								type='checkbox'
							/>
							I agree to the <Link to='/privacy'>Privacy Policy</Link>
						</label>
						{errors.privacypolicy && <div className={'errorText'}>Please accept the Privacy Policy.</div>}
					</Form.Field>
					<div className={'mainButtonContainer'}>
						<Button
							primary
							disabled={loading}
							onClick={handleSubmitForm}
							type="submit"
						>
							Sign-up
						</Button>
						{error && <FilteredError text={error.message}/>}
					</div>
				</Form>
			</Grid.Column>
			<Grid.Column only='tablet computer' tablet={2} computer={4} largeScreen={5} widescreen={5}/>
		</Grid>
	);
};

export default styled(SignupForm)`

	.mainButtonContainer{
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 3rem;
	}

	input.error {
		border-color: #fe4850 !important;
	}

	.errorText {
		color: #fe4850
	}

	i.icon.question.circle:before {
		color: grey_secondary;
	}

	.checkbox-label {
		position: relative;
		bottom: 0.1rem;
		display: inline-block !important;
		font-size: sm !important;
		font-weight: 400 !important;
		color: grey_primary !important;
		a {
			color: grey_primary;
			border-bottom-style: solid;
			border-bottom-width: 1px;
			border-bottom-color: grey_primary;
		}
	}

	.ui.form input[type=checkbox]{
		position: relative;
		bottom: 0.2rem;
		margin-right: 1rem;
		vertical-align: middle;
	}
`;
