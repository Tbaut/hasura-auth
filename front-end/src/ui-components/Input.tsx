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
