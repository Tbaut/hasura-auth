import { ApolloQueryResult } from 'apollo-client';
import React, { useContext, useState } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import styled from '@xstyled/styled-components';

import Comments from '../Comment/Comments';
import NoPostFound from '../NoPostFound';
import { UserDetailsContext } from '../../context/UserDetailsContext';
import CreatePostComment from './PostCommentForm';
import EditablePostContent from '../EditablePostContent';
import {
	DiscussionPostAndCommentsQueryHookResult,
	ProposalPostAndCommentsQueryHookResult,
	ReferendumPostAndCommentsQueryHookResult,
	MotionPostAndCommentsQueryHookResult,
	TreasuryProposalPostAndCommentsQueryHookResult,

	DiscussionPostAndCommentsQueryVariables,
	ProposalPostAndCommentsQueryVariables,
	ReferendumPostAndCommentsQueryVariables,
	MotionPostAndCommentsQueryVariables,
	TreasuryProposalPostAndCommentsQueryVariables,

	OnchainLinkProposalFragment,
	OnchainLinkReferendumFragment,
	OnchainLinkMotionFragment,
	OnchainLinkTreasuryProposalFragment,

	ProposalPostFragment,
	ReferendumPostFragment,
	MotionPostFragment,
	TreasuryProposalPostFragment,

	DiscussionPostAndCommentsQuery,
	ProposalPostAndCommentsQuery,
	ReferendumPostAndCommentsQuery,
	MotionPostAndCommentsQuery,
	TreasuryProposalPostAndCommentsQuery
} from '../../generated/graphql';
import SubscriptionButton from '../SubscriptionButton/SubscriptionButton';
import ReportButton from '../ReportButton';
import Button from '../../ui-components/Button';
import PostMotionInfo from './PostGovernanceInfo/PostMotionInfo';
import PostProposalInfo from './PostGovernanceInfo/PostProposalInfo';
import PostReferendumInfo from './PostGovernanceInfo/PostReferendumInfo';
import PostTreasuryInfo from './PostGovernanceInfo/PostTreasuryInfo';
import GovenanceSideBar from './GovernanceSideBar';

interface Props {
	className?: string
	data: DiscussionPostAndCommentsQueryHookResult['data'] | ProposalPostAndCommentsQueryHookResult['data'] | ReferendumPostAndCommentsQueryHookResult['data'] | MotionPostAndCommentsQueryHookResult['data'] | TreasuryProposalPostAndCommentsQueryHookResult['data']
	isMotion?: boolean
	isProposal?: boolean
	isReferendum?: boolean
	isTreasuryProposal?: boolean
	refetch: (variables?: ReferendumPostAndCommentsQueryVariables | DiscussionPostAndCommentsQueryVariables | ProposalPostAndCommentsQueryVariables | MotionPostAndCommentsQueryVariables | TreasuryProposalPostAndCommentsQueryVariables | undefined) => Promise<ApolloQueryResult<ReferendumPostAndCommentsQuery>> | Promise<ApolloQueryResult<ProposalPostAndCommentsQuery>> | Promise<ApolloQueryResult<MotionPostAndCommentsQuery>> | Promise<ApolloQueryResult<TreasuryProposalPostAndCommentsQuery>> | Promise<ApolloQueryResult<DiscussionPostAndCommentsQuery>>
}

const Post = ( { className, data, isMotion = false, isProposal = false, isReferendum = false, isTreasuryProposal = false, refetch }: Props ) => {
	const post =  data && data.posts && data.posts[0];
	const { id, addresses } = useContext(UserDetailsContext);
	const [isPostReplyFormVisible, setPostReplyFormVisibile] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const toggleEdit = () => setIsEditing(!isEditing);
	const togglePostReplyForm = () => {
		setPostReplyFormVisibile(!isPostReplyFormVisible);
	};
	const isOnchainPost = isMotion || isProposal || isReferendum || isTreasuryProposal;

	if (!post) return <NoPostFound
		isMotion={isMotion}
		isProposal={isProposal}
		isReferendum={isReferendum}
		isTreasuryProposal={isTreasuryProposal}
	/>;

	let onchainId: number | null | undefined;
	let referendumPost: ReferendumPostFragment | undefined;
	let proposalPost: ProposalPostFragment | undefined;
	let motionPost: MotionPostFragment | undefined;
	let treasuryPost: TreasuryProposalPostFragment | undefined;
	let definedOnchainLink : OnchainLinkMotionFragment | OnchainLinkReferendumFragment | OnchainLinkProposalFragment | OnchainLinkTreasuryProposalFragment | undefined;
	let postStatus: string | undefined;

	if (isReferendum){
		referendumPost = post as ReferendumPostFragment;
		definedOnchainLink = referendumPost.onchain_link as OnchainLinkReferendumFragment;
		onchainId = definedOnchainLink.onchain_referendum_id;
		postStatus = referendumPost?.onchain_link?.onchain_referendum?.[0]?.referendumStatus?.[0].status;
	}

	if (isProposal) {
		proposalPost = post as ProposalPostFragment;
		definedOnchainLink = proposalPost.onchain_link as OnchainLinkProposalFragment;
		onchainId = definedOnchainLink.onchain_proposal_id;
		postStatus = proposalPost?.onchain_link?.onchain_proposal?.[0]?.proposalStatus?.[0].status;
	}

	if (isMotion) {
		motionPost = post as MotionPostFragment;
		definedOnchainLink = motionPost.onchain_link as OnchainLinkMotionFragment;
		onchainId = definedOnchainLink.onchain_motion_id;
		postStatus = motionPost?.onchain_link?.onchain_motion?.[0]?.motionStatus?.[0].status;
	}

	if (isTreasuryProposal) {
		treasuryPost = post as TreasuryProposalPostFragment;
		definedOnchainLink = treasuryPost.onchain_link as OnchainLinkTreasuryProposalFragment;
		onchainId = definedOnchainLink.onchain_treasury_proposal_id;
		postStatus = treasuryPost?.onchain_link?.onchain_treasury_spend_proposal?.[0]?.treasuryStatus?.[0].status;
	}

	const canEdit = !isEditing && (
		(post.author?.id === id) ||
		(isProposal && proposalPost?.onchain_link?.proposer_address && addresses?.includes(proposalPost.onchain_link.proposer_address)) ||
		(isReferendum && referendumPost?.onchain_link?.proposer_address && addresses?.includes(referendumPost.onchain_link.proposer_address)) ||
		(isMotion && motionPost?.onchain_link?.proposer_address && addresses?.includes(motionPost.onchain_link.proposer_address)) ||
		(isTreasuryProposal && treasuryPost?.onchain_link?.proposer_address && addresses?.includes(treasuryPost.onchain_link.proposer_address))
	);

	return (
		<Grid className={className}>
			<Grid.Column mobile={16} tablet={16} computer={10}>
				<div className='post_content'>
					<EditablePostContent
						isEditing={isEditing}
						onchainId={onchainId}
						post={post}
						postStatus={postStatus}
						refetch={refetch}
						toggleEdit={toggleEdit}
					/>

					{id && !isEditing && <SubscriptionButton postId={post.id}/>}
					{id && !isEditing && <Button className={'social'} onClick={togglePostReplyForm}><Icon name='reply'/>Reply</Button>}
					{canEdit && <Button className={'social'} onClick={toggleEdit}><Icon name='edit' className='icon'/>Edit</Button>}
					{id && !isEditing && !isOnchainPost && <ReportButton type='post' contentId={post.id} />}

					{ id && isPostReplyFormVisible &&
						<CreatePostComment
							onHide={togglePostReplyForm}
							postId={post.id}
							refetch={refetch}
						/>
					}
				</div>
				{ isMotion &&
					<PostMotionInfo
						onchainLink={definedOnchainLink as OnchainLinkMotionFragment}
					/>
				}
				{ isProposal &&
					<PostProposalInfo
						onchainLink={definedOnchainLink as OnchainLinkProposalFragment}
					/>
				}
				{ isReferendum &&
					<PostReferendumInfo
						onchainLink={definedOnchainLink as OnchainLinkReferendumFragment}
					/>
				}
				{ isTreasuryProposal &&
					<PostTreasuryInfo
						onchainLink={definedOnchainLink as OnchainLinkTreasuryProposalFragment}
					/>
				}
				{ !!post.comments?.length &&
					<Comments
						comments={post.comments}
						refetch={refetch}
					/>
				}
			</Grid.Column>
			<Grid.Column className='democracy_card' mobile={16} tablet={16} computer={6}>
				<GovenanceSideBar
					isMotion={isMotion}
					isProposal={isProposal}
					isReferendum={isReferendum}
					isTreasuryProposal={isTreasuryProposal}
					onchainId={onchainId}
					onchainLink={definedOnchainLink}
					status={postStatus}
				/>
			</Grid.Column>
		</Grid>
	);
};

export default styled(Post)`

	.post_content {
		background-color: white;
		border-style: solid;
		border-width: 1px;
		border-color: grey_light;
		padding: 3rem;
		margin-bottom: 1rem;
	}

	@media only screen and (max-width: 576px) {
		.post_content {
			padding: 2rem
		}
	}

	@media only screen and (max-width: 992px) {
		.democracy_card {
			visibility: hidden;
		}
	}
`;
