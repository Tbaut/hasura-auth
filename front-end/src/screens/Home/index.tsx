// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import { UserDetailsContext } from '../../context/UserDetailsContext';
import { useRouter } from '../../hooks';
import Button from '../../ui-components/Button';
import MotionsContainer from '../OnChain/Motions';
import DiscussionContainer from './LatestDiscussions';
import ProposalContainer from './LatestProposals';
import ReferendaContainer from './LatestReferenda';
import TreasuryContainer from './LatestTreasury';

interface Props {
  className?: string
}

const Home = ({ className }: Props) => {
	const { history } = useRouter();
	const currentUser = useContext(UserDetailsContext);
	const handleCreatePost = () => {
		history.push('/post/create');
	};

	return (
		<div className={className}>
			<h1>Latest Activity</h1>
			<Grid stackable reversed='mobile tablet'>
				<Grid.Column mobile={16} tablet={16} computer={10}>
					<h3>Current Referenda</h3>
					<ReferendaContainer className='referendumContainer'/>
					<h3>Latest Proposals</h3>
					<ProposalContainer className='proposalContainer'/>
					<h3>Latest Motions</h3>
					<MotionsContainer className='motionContainer'/>
					<h3>Latest Treasury Proposals</h3>
					<TreasuryContainer className='treasuryContainer' />
					<h3>Latest Discussions</h3>
					<DiscussionContainer className='discussionContainer'/>
				</Grid.Column>
				<Grid.Column mobile={16} tablet={16} computer={6}>
					{currentUser.id && <div className='mainButtonContainer'>
						<Button primary className={'newPostButton'} onClick={handleCreatePost}>New Post</Button>
					</div>}
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default styled(Home)`

	.referendumContainer, .proposalContainer, .discussionContainer, .motionContainer .treasuryContainer {
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


	@media only screen and (max-width: 768px) {

		.mainButtonContainer {
			margin: 0rem;
		}
	}

	@media only screen and (max-width: 991px) and (min-width: 768px) {
		.ui[class*="tablet reversed"].grid {
			flex-direction: column-reverse;
		}

		.mainButtonContainer {
			margin-top: 1rem!important;
		}
	}

	@media only screen and (max-width: 576px) {

		.mainButtonContainer {
			align-items: stretch!important;
			margin: 1rem!important;

			.newPostButton {
				padding: 0.8rem 1rem;
				border-radius: 0.5rem;
			}
		}
	}

	li {
        list-style-type: none;
    }

	.mainButtonContainer {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
`;
