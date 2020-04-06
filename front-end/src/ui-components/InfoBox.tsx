// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React, { ReactNode, useState } from 'react';
import { MdClose } from 'react-icons/md';

interface Props{
	children?: ReactNode
	className?: string
	content?: string
	dismissable?: boolean
	name: string
	title: string
}

const InfoBox = ({ children, className, content, dismissable, name, title }: Props) => {
	const localStorageName = name + 'Visible';
	const infoBoxVisible = localStorage.getItem(localStorageName);
	const [infoVisible, setInfoVisible] = useState(infoBoxVisible === 'true');

	if (infoBoxVisible === null) {
		localStorage.setItem(localStorageName, 'true');
		setInfoVisible(true);
	}

	const handleClose = () => {
		localStorage.setItem(localStorageName, 'false');
		setInfoVisible(false);
	};

	return (
		<>
			{infoVisible &&
			<div className={className}>
				<h4>{title}</h4>
				{dismissable &&
				<div className='close'>
					<MdClose
						onClick={handleClose}
					/>
				</div>}
				{content}
				{children}
			</div>}
		</>
	);
};

export default styled(InfoBox)`
    background-color: grey_light;
	color: black_text;
	border-style: solid;
	border-width: 1px;
	border-color: grey_light;
	padding: 2rem 3rem;
	position: relative;
	margin-bottom: 2rem;
	
	h4 {
		font-family: font_mono;
		font-size: md;
		margin-bottom: 1.2rem;
	}

	.close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: lg;
		&:hover {
			color: grey_secondary;
			cursor: pointer;
		}
	}
`;
