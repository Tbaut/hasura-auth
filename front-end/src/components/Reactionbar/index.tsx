// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useContext } from 'react';
import styled from '@xstyled/styled-components';

import { ReactionContext } from '../../context/ReactionContext';
import { PostReactionFieldsFragment, CommentReactionFieldsFragment } from '../../generated/graphql';
import ReactionButton, { ReactionButtonProps } from './ReactionButton';

interface Props {
	className?: string
	postReactions?: PostReactionFieldsFragment[]
	commentReactions?: CommentReactionFieldsFragment[]
	postId?: number
	commentId?: string
}

const ReactionBar = function ({ className, commentId, postId, postReactions, commentReactions }: Props) {
	const { reactions } = useContext(ReactionContext);

	if (!reactions.length) {
		return null;
	}

	const reactionMap: { [ key: string ]: ReactionButtonProps; } = {};

	reactions.forEach(({ reaction, id }) => {
		const reactionButtonProp: ReactionButtonProps = {
			count: 0,
			people: {},
			reaction,
			reactionId: id
		};
		reactionMap[`${id}`] = reactionButtonProp;
	});

	postReactions?.forEach(({ reaction, reactor }) => {
		if (!reactionMap[reaction.id]) {
			return;
		}

		reactionMap[reaction.id].count++;

		if (
			reactor?.id &&
			!reactionMap[reaction.id].people[`${reactor?.id}`]
		) {
			reactionMap[reaction.id].people[`${reactor?.id}`] = `${reactor?.username}`;
		}
	});

	commentReactions?.forEach(({ reaction, reactor }) => {
		if (!reactionMap[reaction.id]) {
			return;
		}

		reactionMap[reaction.id].count++;

		if (
			reactor?.id &&
			!reactionMap[reaction.id].people[`${reactor?.id}`]
		) {
			reactionMap[reaction.id].people[`${reactor?.id}`] = `${reactor?.username}`;
		}
	});

	return (
		<div className={className}>
			{Object.keys(reactionMap).map((id) => {
				const {
					count,
					people,
					reaction,
					reactionId
				} = reactionMap[id];

				return (
					<ReactionButton
						key={id}
						count={count}
						people={people}
						reaction={reaction}
						reactionId={reactionId}
						commentId={commentId}
						postId={postId}
					/>
				);
			})}
		</div>
	);
};

export default styled(ReactionBar)`
	background-color: white;
	border-style: solid;
	border-width: 1px;
	border-color: grey_light;
	margin-bottom: 1rem;
	padding: 5px;
`;
