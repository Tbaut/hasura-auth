import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@xstyled/styled-components';

import DiscussionCard from '../DiscussionCard';
import { LatestDiscussionPostsQuery } from '../../generated/graphql';

interface Props {
  className?: string
  data: LatestDiscussionPostsQuery
}

const Discussions = ({ className, data }: Props) => {
	if (!data.posts || !data.posts.length) return <div>No discussion found.</div>;

	return (
		<ul className={`${className} discussions__list`}>
			{!!data.posts &&
				data.posts.map(
					(post) => {

						return (!!post?.author?.username && (
							<li key={post.id} className='discussions__item'>
								{<Link to={`/post/${post.id}`}>
									<DiscussionCard
										displayname={post?.author?.name}
										comments={post.comments_aggregate.aggregate?.count
											? post.comments_aggregate.aggregate.count.toString()
											: 'no'}
										created_at={post.created_at}
										title={post.title}
										username={post.author.username}
									/>
								</Link>}
							</li>
						));
					}
				)
			}
		</ul>
	);
};

export default styled(Discussions)`
	margin-block-start: 0;
	margin-block-end: 0;

	li {
		list-style-type: none;
	}

	.discussions__item {
		margin: 0 0 1rem 0;
		a:hover {
			text-decoration: none;
		}
	}
`;