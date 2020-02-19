import React from 'react';
import styled from '@xstyled/styled-components';
import { Grid } from 'semantic-ui-react';

import TAC from '../../assets/terms-and-conditions';
import PP from '../../assets/privacy-policy';
import TOW from '../../assets/terms-of-website';
import Markdown from '../../ui-components/Markdown';
interface Props{
    md: string
    className?: string
}

const MdScreen = ({ md, className } : Props) => {
	return (
		<Grid className={className}>
			<Grid.Column tablet={4} computer={2} largeScreen={2} widescreen={2}/>
			<Grid.Column className='md_box' mobile={16} tablet={12} computer={12} largeScreen={12} widescreen={12}>
				<Markdown className='markdown' md={md}/>
			</Grid.Column>
		</Grid>
	);
};

const StyledMdScreen = styled(MdScreen)`
    .md_box {
        background-color: white;
        padding: 3rem!important;
        border-width: 1px;
        border-style: solid;
        border-color: grey_light;
    }
`;

export const TermsAndConditions = () => <StyledMdScreen md={TAC}/>;
export const PrivacyPolicy = () => <StyledMdScreen md={PP}/>;
export const TermsOfWebsite = () => <StyledMdScreen md={TOW}/>;

