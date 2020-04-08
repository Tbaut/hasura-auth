// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { web3Accounts, web3Enable,web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { stringToHex } from '@polkadot/util';
import styled from '@xstyled/styled-components';
import React, { useContext,useState } from 'react';
import { Grid,Icon } from 'semantic-ui-react';

import ExtensionNotDetected from '../../components/ExtensionNotDetected';
import { NotificationContext } from '../../context/NotificationContext';
import { UserDetailsContext } from '../../context/UserDetailsContext';
import { useAddressLinkConfirmMutation, useAddressLinkStartMutation, useAddressUnlinkMutation } from '../../generated/graphql';
import { handleTokenChange } from '../../services/auth.service';
import { NotificationStatus } from '../../types';
import AddressComponent from '../../ui-components/Address';
import Button from '../../ui-components/Button';
import { Form } from '../../ui-components/Form';
import cleanError from '../../util/cleanError';
import getEncodedAddress from '../../util/getEncodedAddress';
import getExtensionUrl from '../../util/getExtensionUrl';

interface Props{
	className?: string
}

const APPNAME = process.env.REACT_APP_APPNAME || 'polkassembly';
const NETWORK = process.env.REACT_APP_NETWORK || 'kusama';

const Address = ({ className }: Props): JSX.Element => {
	const currentUser = useContext(UserDetailsContext);
	const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
	const [extensionNotAvailable, setExtensionNotAvailable] = useState(false);
	const [addressLinkStartMutation] = useAddressLinkStartMutation();
	const [addressLinkConfirmMutation] = useAddressLinkConfirmMutation();
	const [addressUnlinkMutation] = useAddressUnlinkMutation();
	const { queueNotification } = useContext(NotificationContext);

	const handleDetect = async () => {
		const extensions = await web3Enable(APPNAME);

		if (extensions.length === 0) {
			setExtensionNotAvailable(true);
			return;
		} else {
			setExtensionNotAvailable(false);
		}

		const allAccounts = await web3Accounts();

		setAccounts(allAccounts);
	};

	const handleLink = async (address: InjectedAccountWithMeta['address'], account: InjectedAccountWithMeta) => {

		try {
			const injected = await web3FromSource(account.meta.source);
			const signRaw = injected && injected.signer && injected.signer.signRaw;

			if (!signRaw) {
				return console.error('Signer not available');
			}

			const addressLinkStartResult = await addressLinkStartMutation({
				variables: {
					address,
					network: NETWORK
				}
			});

			if (!addressLinkStartResult || !addressLinkStartResult.data || !addressLinkStartResult.data.addressLinkStart) {
				return console.error('Address link start mutaion failed');
			}

			const { signature } = await signRaw({
				address,
				data: stringToHex(addressLinkStartResult.data.addressLinkStart.sign_message || ''),
				type: 'bytes'
			});

			const addressLinkConfirmResult = await addressLinkConfirmMutation({
				variables: {
					address_id: addressLinkStartResult.data.addressLinkStart.address_id || 0,
					signature
				}
			});

			if (addressLinkConfirmResult.data?.addressLinkConfirm?.token) {
				handleTokenChange(addressLinkConfirmResult.data?.addressLinkConfirm?.token);
			}

			!currentUser.addresses?.includes(address) && currentUser.setUserDetailsContextState((prevState) => {
				return {
					...prevState,
					addresses: [...prevState.addresses, address]
				};
			});

			queueNotification({
				header: 'Success!',
				message: addressLinkConfirmResult && addressLinkConfirmResult.data && addressLinkConfirmResult.data.addressLinkConfirm && addressLinkConfirmResult.data.addressLinkConfirm.message || '',
				status: NotificationStatus.SUCCESS
			});
		} catch (error) {
			console.error(error);
			queueNotification({
				header: 'Failed!',
				message: cleanError(error.message),
				status: NotificationStatus.ERROR
			});
		}
	};

	const handleUnlink = async (address: InjectedAccountWithMeta['address']) => {
		try {
			const addressUnlinkConfirmResult = await addressUnlinkMutation({
				variables: {
					address
				}
			});

			if (addressUnlinkConfirmResult.data?.addressUnlink?.token) {
				handleTokenChange(addressUnlinkConfirmResult.data?.addressUnlink?.token);
			}

			if (currentUser.addresses?.includes(address)) {
				currentUser.setUserDetailsContextState((prevState) => {
					return {
						...prevState,
						addresses: prevState?.addresses?.filter((prevAddress) => prevAddress !== address)
					};
				});
			}

			queueNotification({
				header: 'Success!',
				message: addressUnlinkConfirmResult && addressUnlinkConfirmResult.data && addressUnlinkConfirmResult.data.addressUnlink && addressUnlinkConfirmResult.data.addressUnlink.message || '',
				status: NotificationStatus.SUCCESS
			});
		} catch (error) {
			console.error(error);
			queueNotification({
				header: 'Failed!',
				message: cleanError(error.message),
				status: NotificationStatus.ERROR
			});
		}
	};

	const linkIcon = <><Icon name='chain'/>Link</>;
	const unlinkIcon = <><Icon name='broken chain'/>Unlink</>;

	if (extensionNotAvailable) {
		return (
			<Form className={className} standalone={false}>
				<Form.Group>
					<Form.Field width={16}>
						<ExtensionNotDetected />
					</Form.Field>
				</Form.Group>
			</Form>
		);
	}

	if (accounts.length === 0) {
		return (
			<Form className={className} standalone={false}>
				<Form.Group>
					<Form.Field width={16}>
						<label>Linked address</label>
						<div className='text-muted'>Associate your account with an on chain address using the <a href={getExtensionUrl()}>Polkadot-js extension</a>.</div>
						<div className='link-button-container'>
							<Button primary onClick={handleDetect}>
								{currentUser?.addresses?.length ? 'Show Linked Addresses' : 'Link Address'}
							</Button>
						</div>
					</Form.Field>
				</Form.Group>
			</Form>
		);
	}

	return (
		<Form className={className} standalone={false}>
			<Form.Group>
				<Form.Field width={16}>
					<label className="header">Available Addresses</label>
					<div className="ui list">
						{accounts.map(account => {
							const address = getEncodedAddress(account.address);

							return address &&
								<Grid key={address}>
									<Grid.Column width={10}>
										<div className="item">
											<AddressComponent className="item" address={address} accountName={account.meta.name || ''} />
										</div>
									</Grid.Column>
									<Grid.Column width={6}>
										<div className="button-container">
											<Button
												className={'social'}
												negative={currentUser.addresses?.includes(address) ? true : false}
												onClick={() => currentUser.addresses?.includes(address) ? handleUnlink(address) : handleLink(address, account)}
											>
												{currentUser.addresses?.includes(address) ? unlinkIcon : linkIcon}
											</Button>
										</div>
									</Grid.Column>
								</Grid>
							;}
						)}

					</div>
				</Form.Field>
			</Form.Group>
		</Form>
	);
};

export default styled(Address)`

	.button-container {
		position: absolute;
		top: 50%;
		margin-top: -1.8rem;
	}
`;
