// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import * as moment from 'moment';
import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import BlockCountdown from 'src/components/BlockCountdown';
import BlocksToTime from 'src/components/BlocksToTime';

import { OnchainLinkReferendumFragment } from '../../../generated/graphql';
import AddressComponent from '../../../ui-components/Address';
import OnchainInfoWrapper from '../../../ui-components/OnchainInfoWrapper';
import ExternalLinks from '../../ExternalLinks';

interface Props{
	onchainLink: OnchainLinkReferendumFragment
}

const PostReferendumInfo = ({ onchainLink }: Props) => {
	if (!onchainLink) return null;

	const {
		onchain_referendum: onchainReferendum,
		proposer_address: proposerAddress
	} = onchainLink;

	if ( !onchainReferendum?.[0] ){
		return null;
	}

	const { delay, end, referendumStatus, preimage, voteThreshold } = onchainReferendum?.[0];
	const { metaDescription, method, preimageArguments } = preimage || {};
	const { blockNumber, status } = referendumStatus?.[0] || {};

	return (
		<OnchainInfoWrapper>
			<h4>On-chain info</h4>
			<Grid>
				<Grid.Column mobile={16} tablet={8} computer={8}>
					<h6>Proposer</h6>
					<AddressComponent address={proposerAddress}/>
				</Grid.Column>
				{(delay || delay === 0) &&
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<h6>Delay</h6>
						<BlocksToTime blocks={delay} />
					</Grid.Column>}
				{end &&
					<Grid.Column mobile={16} tablet={8} computer={8}>
						{status === 'Started'
							?
							<>
								<h6>End</h6>
								<BlockCountdown endBlock={end}/>
							</>
							:
							<>
								<h6>Ended</h6>
								<div>{moment.utc(blockNumber?.startDateTime).format('DD MMM YYYY, HH:mm:ss')}</div>
							</>
						}
					</Grid.Column>}
				{voteThreshold &&
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<h6>Vote threshold</h6>
						{voteThreshold}
					</Grid.Column>}
				{method &&
				<Grid.Row>
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<h6>Method</h6>
						{method}
					</Grid.Column>
					<Grid.Column mobile={16} tablet={8} computer={8}>
						{preimageArguments && preimageArguments.length
							? <>
								<h6>Arguments</h6>
								{preimageArguments.map((element, index) => {
									const isAccountArgument = element.name === 'account';
									return <div className={isAccountArgument ? '' : 'methodArguments'} key={index}>
										{isAccountArgument
											? <AddressComponent address={element.value} key={index}/>
											: <span key={index}>{element.name}: {element.value}</span>
										}
									</div>;
								})}
							</>
							: null}
					</Grid.Column>
				</Grid.Row>}
				{metaDescription &&
				<Grid.Column mobile={16} tablet={16} computer={16}>
					<h6>Description</h6>
					{metaDescription}
				</Grid.Column>}
				<Grid.Column mobile={16} tablet={16} computer={16}>
					<ExternalLinks isReferendum={true} onchainId={onchainLink.onchain_referendum_id} />
				</Grid.Column>
			</Grid>
		</OnchainInfoWrapper>
	);
};

export default PostReferendumInfo;
