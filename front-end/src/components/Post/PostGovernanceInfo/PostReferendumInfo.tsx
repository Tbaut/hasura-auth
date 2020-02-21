import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from '@xstyled/styled-components';

import AddressComponent from '../../../ui-components/Address';
import { OnchainLinkReferendumFragment } from '../../../generated/graphql';

interface Props{
	className?: string
	onchainLink: OnchainLinkReferendumFragment
}

const PostReferendumInfo = ({ className, onchainLink }: Props) => {
	if (!onchainLink) return null;

	const {
		onchain_referendum: onchainReferendum,
		proposer_address: proposerAddress
	} = onchainLink;

	if ( !onchainReferendum?.[0] ){
		return null;
	}

	const { delay, end, preimage, voteThreshold } = onchainReferendum?.[0];
	const { metaDescription, method, preimageArguments } = preimage || {};

	return (
		<div className={className}>
			<h4>On-Chain Info</h4>
			<Grid>
				<Grid.Column mobile={16} tablet={8} computer={8}>
					<div className='info_group'>
						<h6>Proposer</h6>
						<AddressComponent className='' address={proposerAddress} accountName={'Proposer Address'}/>
					</div>
				</Grid.Column>
				{delay &&
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<div className='info_group'>
							<h6>Delay</h6>
							{delay}
						</div>
					</Grid.Column>}
				{end &&
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<div className='info_group'>
							<h6>End</h6>
							{end}
						</div>
					</Grid.Column>}
				{voteThreshold &&
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<div className='info_group'>
							<h6>voteThreshold</h6>
							{voteThreshold}
						</div>
					</Grid.Column>}
				{method &&
				<Grid.Row>
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<div className='info_group'>
							<h6>Method</h6>
							{method}
						</div>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={8} computer={8}>
						{preimageArguments && preimageArguments.length
							? <div className='info_group'>
								<h6>Arguments</h6>
								{preimageArguments.map((element, index) => {
									return <div className={'methodArguments'} key={index}>
										<span key={index}>{element.name}: {element.value}</span>
									</div>;
								})}
							</div>
							: null}
					</Grid.Column>
				</Grid.Row>}
				{metaDescription &&
				<Grid.Column mobile={16} tablet={16} computer={16}>
					<div className='info_group'>
						<h6>Description</h6>
						{metaDescription}
					</div>
				</Grid.Column>}
			</Grid>
		</div>
	);
};

export default styled(PostReferendumInfo)`
	background-color: white;
	padding: 2rem 3rem 2rem 3rem;
	border-style: solid;
	border-width: 5px;
	border-color: grey_light;
	font-size: sm;
	overflow-wrap: break-word;
	margin-bottom: 1rem;
	font-family: 'Roboto Mono';

	h6 {
		font-family: 'Roboto Mono';
		font-size: sm;
	}

	h4 {
		font-size: lg;
		font-family: 'Roboto Mono';
		margin-bottom: 2rem;
	}

	.methodArguments {
		display: inline-block;
		overflow-x: auto;
		width: 100%;
		word-wrap: normal;
	}

	@media only screen and (max-width: 576px) {
		padding: 2rem;
	}
`;
