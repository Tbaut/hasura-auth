// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';

import { useCommentReactionsQuery } from '../../generated/graphql';
import { ReactionMapFields } from '../../types';
import ReactionButton from './ReactionButton';
import { reactions } from './reactions';

interface Props {
	className?: string
	commentId: string
}

const CommentReactionBar = function ({ className, commentId }: Props) {
	const { data, refetch } = useCommentReactionsQuery({ variables: { commentId } });

	const reactionMap: { [ key: string ]: ReactionMapFields; } = {};

	reactions.forEach((reaction) => {
		reactionMap[reaction] = {
			count: 0,
			userIds: []
		};
	});

	data?.comment_reactions?.forEach(({ reaction, reacting_user }) => {
		if (!reactionMap[reaction]) {
			return;
		}

		if (reacting_user?.id && reactionMap[reaction].userIds.includes(reacting_user?.id)){
			console.error('This user has already reacted.');
			return;
		}

		if (reacting_user?.id) {
			reactionMap[reaction].userIds.push(reacting_user?.id);
		}

		reactionMap[reaction].count++;
	});

	return (
		<div className={className}>
			{Object.keys(reactionMap).map((reaction) => {
				const {
					count,
					userIds
				} = reactionMap[reaction];

				return (
					<ReactionButton
						key={reaction}
						count={count}
						userIds={userIds}
						reaction={reaction}
						commentId={commentId}
						refetch={refetch}
					/>
				);
			})}
		</div>
	);
};

export default styled(CommentReactionBar)`
	background-color: white;
	border-style: solid;
	border-width: 1px;
	border-color: grey_light;
	margin-bottom: 1rem;
	padding: 5px;
`;
