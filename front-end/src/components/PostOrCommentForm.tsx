import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import { Form } from '../ui-components/Form';
import { TextArea } from '../ui-components/TextArea';

interface Props {
	className?: string
	content: string
	onContentChange?: (content: string) => void
	onTitleChange?: (event: ChangeEvent<HTMLInputElement>) => void
	refTitle?: any,
	title?: string
	withTitle?: boolean
}

const PostOrCommentForm = ({ className, content, onContentChange, onTitleChange, refTitle, title='', withTitle=true }:Props): JSX.Element => {

	return (
		<div className={className}>
			{
				withTitle && <Form.Group>
					<Form.Field width={16}>
						<label>Title</label>
						<input
							className={'title'}
							onChange={onTitleChange}
							placeholder='Your title...'
							ref={refTitle}
							type="text"
							value={title}
						/>
					</Form.Field>
				</Form.Group>
			}
			<Form.Group>
				<TextArea
					onChange={onContentChange}
					value={content}
				/>
			</Form.Group>
		</div>
	);
};

export default styled(PostOrCommentForm)`
	.fields {
		padding: 0;
	}

	input.title {
		font-size: 1.4rem !important;
	}

	textarea {
		font-size: 1.4rem;
	}

	.container {
		max-width: 100%;
		padding: 0 0.5rem;
	}
`;
