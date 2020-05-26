// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ApiPromiseContext } from '@substrate/context';
import styled from '@xstyled/styled-components';
import React, { useContext, useEffect,useState } from 'react';
import { DropdownProps } from 'semantic-ui-react';
import Loader from 'src/ui-components/Loader';

import { NotificationContext } from '../../../../context/NotificationContext';
import { LoadingStatusType,NotificationStatus } from '../../../../types';
import AccountSelectionForm from '../../../../ui-components/AccountSelectionForm';
import Button from '../../../../ui-components/Button';
import Card from '../../../../ui-components/Card';
import { Form } from '../../../../ui-components/Form';

interface Props {
	accounts: InjectedAccountWithMeta[]
	address: string
	className?: string
	proposalId?: number | null | undefined
	getAccounts: () => Promise<undefined>
	onAccountChange: (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void
}

const SecondProposal = ({ className, proposalId, address, accounts, onAccountChange, getAccounts }: Props) => {
	const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>({ isLoading: false, message:'' });
	const { queueNotification } = useContext(NotificationContext);
	const { api, isApiReady } = useContext(ApiPromiseContext);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		if (!isApiReady) {
			return;
		}

		let unsubscribe: () => void;

		api.derive.democracy.proposals( proposals => {
			proposals.forEach((proposal) => {
				if (proposal.index.toNumber() === proposalId && proposal.balance) {
					setSeconds(proposal.seconds.length);
				}
			});
			setLoadingStatus({ isLoading: false, message: '' });
		})
			.then(unsub => {unsubscribe = unsub;})
			.catch(e => console.error(e));

		return () => unsubscribe && unsubscribe();

	}, [api, isApiReady, proposalId]);

	const secondProposal = async () => {
		if (!proposalId && proposalId !== 0) {
			console.error('proposalId not set');
			return;
		}

		setLoadingStatus({ isLoading: true, message: 'Waiting for signature' });

		const params = api.tx.democracy.second.meta.args.length === 2
			? [proposalId, seconds]
			: [proposalId];

		// eslint-disable-next-line no-extra-parens
		const second = (api.tx.democracy as any).second(...params);

		second.signAndSend(address, ({ status }: any) => {
			if (status.isInBlock) {
				setLoadingStatus({ isLoading: false, message: '' });
				queueNotification({
					header: 'Success!',
					message: `Vote on proposal #${proposalId} successful.`,
					status: NotificationStatus.SUCCESS
				});

				console.log(`Completed at block hash #${status.asInBlock.toString()}`);
			} else {
				if (status.isBroadcast) {
					setLoadingStatus({ isLoading: true, message: 'Broadcasting the vote' });
				}
				console.log(`Current status: ${status.type}`);
			}
		}).catch((error: any) => {
			setLoadingStatus({ isLoading: false, message: '' });
			console.log(':( transaction failed');
			console.error('ERROR:', error);
			queueNotification({
				header: 'Failed!',
				message: error.message,
				status: NotificationStatus.ERROR
			});
		});
	};

	const GetAccountsButton = () =>
		<Form.Field className='button-container'>
			<Button
				primary
				onClick={getAccounts}
				size={'large'}
			>
				Second
			</Button>
		</Form.Field>;

	const noAccount = accounts.length === 0;

	return (
		<div className={className}>
			{ noAccount
				? <GetAccountsButton />
				:loadingStatus.isLoading
					? <Card className={'LoaderWrapper'}>
						<Loader text={loadingStatus.message}/>
					</Card>
					: <Card>
						<AccountSelectionForm
							title='Second with account'
							accounts={accounts}
							address={address}
							withBalance
							onAccountChange={onAccountChange}
						/>
						<Button
							primary
							disabled={!isApiReady}
							onClick={secondProposal}
						>
							Second
						</Button>
					</Card>
			}
		</div>
	);
};

export default styled(SecondProposal)`

	.LoaderWrapper {
		height: 15rem;
		position: absolute;
		width: 100%;
	}
`;
