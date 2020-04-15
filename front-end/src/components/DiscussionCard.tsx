// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import * as React from 'react';
import { Icon } from 'semantic-ui-react';

import CreationLabel from '../ui-components/CreationLabel';

const DiscussionCard = styled.div`
    padding: 2rem 3rem 1.5rem 3rem;
    background-color: white;
    border-style: solid;
    border-width: 1px;
    border-color: grey_border;
    border-radius: 3px;
    &:hover {
        background-color: white_transparent;
        border-style: solid;
        border-width: 1px;
        text-decoration: none;
    }
    h4 {
        font-family: font_default;
        font-size: md;
        margin-bottom: 0.3rem; 
    }
    ul {
        color: grey_secondary;
        font-size: xs;
        font-family: font_default;
        font-weight: 500;
        li {
            display: inline;
            margin-right: 1.5rem;
        }
    }

    @media only screen and (max-width: 576px) {
        & {
            padding: 1.2rem 1.5rem;       
        }
    }
`;

export interface DiscussionProps {
  created_at: Date
  displayname?: string | null
  comments?: string
  title: string
  username: string
}

export default function Discussion ({
	created_at,
	displayname,
	comments,
	title,
	username
}:DiscussionProps) {

	return (
		<DiscussionCard>
			<h4>{title}</h4>
			<CreationLabel
				created_at={created_at}
				displayname={displayname}
				username={username}
			/>
			<ul>
				<li><Icon name='comment' /> {comments} comments</li>
			</ul>
		</DiscussionCard>
	);
}
