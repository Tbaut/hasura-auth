import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Replies } from '../../generated/graphql';

const Replies = ({ replies }:{replies: Replies[]}) => {
	return (
		<div className='Replies'>
			<hr/>
			<div>Replies</div>
			{
				replies.map((reply:Replies) => {
					const { author, content, created_at } = reply;

					if (!author || !author.username || !content) return null;
					return (
						<div key={created_at}>
							<h3>{author.username} - {created_at}</h3>
							<ReactMarkdown source={content} />
						</div>
					);
				})
			}
		</div>
	)
}

export default Replies;