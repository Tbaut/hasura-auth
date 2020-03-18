// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useContext, useState } from 'react';
import { DropdownProps } from 'semantic-ui-react';
import styled from '@xstyled/styled-components';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { Form } from '../../../ui-components/Form';
import Button from '../../../ui-components/Button';
import { ApiContext } from '../../../context/ApiContext';
import { NotificationContext } from '../../../context/NotificationContext';
import { NotificationStatus } from '../../../types';
import Loader from 'src/ui-components/Loader';
import AccountSelectionForm from './AccountSelectionForm';

interface Props {
	accounts: InjectedAccountWithMeta[]
	address: string
	className?: string
	proposalId?: number | null | undefined
	getAccounts: () => Promise<undefined>
	onAccountChange: (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void
}

const SecondProposal = ({ className, proposalId, address, accounts, onAccountChange, getAccounts }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const { queueNotification } = useContext(NotificationContext);
	const { api, apiReady } = useContext(ApiContext);

	const secondProposal = async () => {
		if (!api) {
			console.error('polkadot/api not set');
			return;
		}

		if (!proposalId && proposalId !== 0) {
			console.error('proposalId not set');
			return;
		}

		const second = api.tx.democracy.second(proposalId);
		setIsLoading(true);

		second.signAndSend(address, ({ status }) => {
			if (status.isFinalized || status.isInBlock) {
				setIsLoading(false);
				queueNotification({
					header: 'Success!',
					message: `Vote on proposal #${proposalId} successfully finalized`,
					status: NotificationStatus.SUCCESS
				});

				console.log(`Completed at block hash #${status.asFinalized.toString()}`);
			} else {
				console.log(`Current status: ${status.type}`);
			}
		}).catch((error) => {
			setIsLoading(false);
			console.log(':( transaction failed');
			console.error('ERROR:', error);
			queueNotification({
				header: 'Failed!',
				message: error.message,
				status: NotificationStatus.ERROR
			});
		});
	};

	if (accounts.length === 0) {
		return (
			<div className={className}>
				<div className='card'>
					<Form standalone={false}>
						<h4>Vote</h4>
						<Form.Group>
							<Form.Field className='button-container'>
								<Button
									primary
									onClick={getAccounts}
								>
									Second
								</Button>
							</Form.Field>
						</Form.Group>
					</Form>
				</div>
			</div>
		);
	}

	return (
		<div className={className}>
			<div className='card'>
				<Form standalone={false}>
					<h4>Second</h4>
					{isLoading
						? <div className={'LoaderWrapper'}>
							<Loader text={'Broadcasting your vote'}/>
						</div>
						: <>
							<AccountSelectionForm
								accounts={accounts}
								address={address}
								onAccountChange={onAccountChange}
							/>
							<Button
								primary
								disabled={!apiReady}
								onClick={secondProposal}
							>
								Second
							</Button>
						</>
					}
				</Form>
			</div>
		</div>
	);
};

export default styled(SecondProposal)`
	.card {
		background-color: white;
		padding: 2rem 3rem 3rem 3rem;
		border-style: solid;
		border-width: 1px;
		border-color: grey_light;
		margin-bottom: 1rem;
	}

	.LoaderWrapper {
		height: 15rem;
	}

	@media only screen and (max-width: 768px) {
		.ui.form {
			padding: 0rem;
		}

		.button-container {
			margin-bottom: 1rem!important;
		}
	}
`;
