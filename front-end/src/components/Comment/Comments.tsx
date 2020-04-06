// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ApolloQueryResult } from 'apollo-client/core/types';
import * as React from 'react';
import styled from 'styled-components';

import {
	CommentFieldsFragment,
	DiscussionPostAndCommentsQuery,
	DiscussionPostAndCommentsQueryVariables,
	MotionPostAndCommentsQuery,
	MotionPostAndCommentsQueryVariables,
	ProposalPostAndCommentsQuery,
	ProposalPostAndCommentsQueryVariables,
	ReferendumPostAndCommentsQuery,
	ReferendumPostAndCommentsQueryVariables,
	TreasuryProposalPostAndCommentsQuery,
	TreasuryProposalPostAndCommentsQueryVariables
} from '../../generated/graphql';
import Comment from './Comment';

interface Props{
	className?: string
	comments: CommentFieldsFragment[]
	refetch: (variables?:
		ReferendumPostAndCommentsQueryVariables |
		DiscussionPostAndCommentsQueryVariables |
		ProposalPostAndCommentsQueryVariables |
		MotionPostAndCommentsQueryVariables |
		TreasuryProposalPostAndCommentsQueryVariables |
		undefined) =>
		Promise<ApolloQueryResult<TreasuryProposalPostAndCommentsQuery>> |
		Promise<ApolloQueryResult<MotionPostAndCommentsQuery>> |
		Promise<ApolloQueryResult<ReferendumPostAndCommentsQuery>> |
		Promise<ApolloQueryResult<ProposalPostAndCommentsQuery>> |
		Promise<ApolloQueryResult<DiscussionPostAndCommentsQuery>>
}

const Comments = ({ className, comments, refetch }: Props) => {
	return (
		<div className={className}>
			{comments.map((comment:CommentFieldsFragment) =>
				<Comment
					comment={comment}
					key={comment.id}
					refetch={refetch}
				/>
			)}
		</div>
	);
};

export default styled(Comments)`
	margin-top: 4rem;
`;
