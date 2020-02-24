import styled from '@xstyled/styled-components';
import React from 'react';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

import MotionContainer from './Motions';
import ProposalContainer from './Proposals';
import ReferendaContainer from './Referenda';
import InfoBox from '../../ui-components/InfoBox';

const OnchainPostsContainer = ({ className } : {className?: string}) => {

	return (
		<div className={className}>
			<h1>Latest On Chain Activity</h1>
			<Grid stackable reversed='mobile tablet'>
				<Grid.Column mobile={16} tablet={16} computer={10}>
					<h3>Referenda</h3>
					<ReferendaContainer className='referendaContainer'/>
					<h3>Proposals</h3>
					<ProposalContainer className='proposalContainer'/>
					<h3>Motions</h3>
					<MotionContainer className='motionContainer'/>
				</Grid.Column>
				<Grid.Column mobile={16} tablet={16} computer={6}>
					<InfoBox
						dismissable={true}
						content='This is the place to discuss on-chain proposals, motions and referenda.
						On-chain posts are automatically generated as soon as they are created on the chain.
						Only the proposer is able to edit them.'
						name='onchainInfo'
						title='About On-chain Posts'
					/>
				</Grid.Column>
			</Grid>
		</div>
	);

};

export default styled(OnchainPostsContainer)`

	.referendaContainer, .proposalContainer {
		margin-bottom: 3rem;
	}

	h1 {
		@media only screen and (max-width: 576px) {
			margin: 3rem 1rem 1rem 1rem;
		}

		@media only screen and (max-width: 768px) and (min-width: 576px) {
			margin-left: 1rem;
		}

		@media only screen and (max-width: 991px) and (min-width: 768px) {
			margin-left: 1rem;
		}
	}

	@media only screen and (max-width: 991px) and (min-width: 768px) {
		.ui[class*="tablet reversed"].grid {
			flex-direction: column-reverse;
		}
	}
`;
