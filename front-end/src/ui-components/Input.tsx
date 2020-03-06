// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import { Form as SUIForm, FormInputProps as SUIFormInputProps } from 'semantic-ui-react';
import styled from '@xstyled/styled-components';

function Input (props : SUIFormInputProps){
	return <SUIForm.Input {...props}/>;
}

export default styled(Input)`
    font-family: font_default;
    font-size: input_text;
    color: black_primary;
    border-style: solid;
    border-width: 1px;
    border-color: grey_light;
    border-radius: 0rem;
    padding: 0.625rem 0 0.5rem 0;
    &:focus {
        outline: 0;
        border-color: grey_light;
    }	
`;
