// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import * as moment from 'moment';
import React from 'react';
import { Popup } from 'semantic-ui-react';
import styled from '@xstyled/styled-components';

import InlineTag from './InlineTag';

interface Props{
    className?: string
    created_at: Date
    displayname?: string | null
	text?: string
	topic?: string
    username: string
}

const CreationLabel = ({ className, created_at, displayname, text='posted', username, topic } : Props) => {
	return <span className={className}>
		{text} by {
			displayname
				?
				<Popup
					trigger={<span>{displayname}</span>}
					content={username}
					hoverable={true}
					position='top center'
				/>
				:
				<span>{username}</span>
		}
		{topic &&
			<>in <InlineTag>{topic}</InlineTag> </>
		}
		{moment.utc(created_at, 'YYYY-MM-DDTHH:mm:ss.SSS').fromNow()}
	</span>;
};

export default styled(CreationLabel)`
    color: grey_primary;
    font-weight: 400;
    font-size: sm;
    margin-bottom: 0.6rem;
        
    span {
        color: black_text;
		font-weight: 500;
		margin-right: 0.3rem;
	}
`;