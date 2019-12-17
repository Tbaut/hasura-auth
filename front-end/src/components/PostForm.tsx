import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import { Form } from '../ui-components/Form';
import { TextArea } from '../ui-components/TextArea';

interface Props {
	className?: string
	content: string
	onContentChange?: (content: string) => void
	onTitleChange?: (event: ChangeEvent<HTMLInputElement>) => void
	title: string
}

const PostForm = ({ className, content, onContentChange, onTitleChange, title }:Props): JSX.Element => {

	return (
		<Form className={className}>
			<Form.Group>
				<Form.Field width={16}>
					<label>Title</label>
					<input
						onChange={onTitleChange}
						placeholder='Your title...'
						type="text"
						value={title}
					/>
				</Form.Field>
			</Form.Group>
			<Form.Group>
				<TextArea
					onChange={onContentChange}
					value={content}
				/>
			</Form.Group>
		</Form>
	);
};

export default styled(PostForm)`
	margin-top: 0;
	border: none;
		.fields {
			padding: 0;
		}

		textarea {
			font-size: 1.4rem;
		}

		.container {
			max-width: 100%;
		}
`