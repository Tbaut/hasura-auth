// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React, { useContext } from 'react';
import { Divider,Grid } from 'semantic-ui-react';

import { UserDetailsContext } from '../../context/UserDetailsContext';
import Address from './address';
import DeleteAccount from './deleteAccount';
import Email from './email';
import Password from  './password';
import SetCredentials from './setCredentials';
import Username from './username';

interface Props {
	className?: string
}

const Settings = ({ className }:Props): JSX.Element => {
	const { web3signup } = useContext(UserDetailsContext);

	return (
		<Grid>
			<Grid.Column className={className} mobile={16} tablet={12} computer={12} largeScreen={10} widescreen={10}>
				<h2>Settings</h2>
				<Divider/>
				{web3signup ? <SetCredentials /> : <Username/>}
				<Divider/>
				{web3signup ? null : <><Email/><Divider/></>}
				{web3signup ? null : <><Password/><Divider/></>}
				<Address/>
				<Divider/>
				<DeleteAccount/>
			</Grid.Column>
			<Grid.Column only='computer' computer={4} largeScreen={6} widescreen={6}/>
		</Grid>
	);
};

export default styled(Settings)`
	background-color: white;
	padding: 2rem 3rem 3rem 3rem!important;
	border-radius: 0.3rem;
	box-shadow: box_shadow_card;

	.ui.divider, .ui.divider:not(.vertical):not(.horizontal) {
		margin: 3rem 0 2rem 0;
		border-top-style: solid;
		border-top-width: 1px;
		border-top-color: grey_light;
		border-bottom: none;
	}

	.button {
		margin-top: 0.2rem;
	}

	.ui.form:not(.unstackable)
	.fields:not(.unstackable)>.ten.wide.field {

		@media only screen and (max-width: 767px)  {
			width: 70%!important;
		}

		@media only screen and (max-width: 576px) {
			width: 60%!important;
		}
	}

	.ui.form:not(.unstackable)
	.fields:not(.unstackable)>.six.wide.field {

		@media only screen and (max-width: 767px)  {
			width: 30%!important;
		}

		@media only screen and (max-width: 576px) {
			width: 40%!important;
		}
	}

	@media only screen and (max-width: 576px) {
		padding: 2rem!important;

		.ui.form {
			margin-top: 0rem;
        	padding: 0rem;
		}

		button {
			padding: 0.8rem 1rem;
			border-radius: 0.5rem;
		}
	}
`;
