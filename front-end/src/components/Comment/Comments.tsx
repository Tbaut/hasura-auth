import { ApolloQueryResult } from 'apollo-client/core/types';
import * as React from 'react';
import styled from 'styled-components';

import Comment from './Comment';
import {
	CommentFieldsFragment,
	ProposalPostAndCommentsQuery,
	ProposalPostAndCommentsQueryVariables,
	ReferendumPostAndCommentsQueryVariables,
	DiscussionPostAndCommentsQueryVariables,
	ReferendumPostAndCommentsQuery,
	DiscussionPostAndCommentsQuery
} from '../../generated/graphql';

interface Props{
	className?: string
	comments: CommentFieldsFragment[]
	refetch: (variables?:
		ReferendumPostAndCommentsQueryVariables |
		DiscussionPostAndCommentsQueryVariables |
		ProposalPostAndCommentsQueryVariables |
		undefined) =>
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
`;