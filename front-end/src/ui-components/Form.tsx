import React from 'react';
import { Form as SUIForm, FormProps as SUIFormProps } from 'semantic-ui-react';
import styled from '@xstyled/styled-components';

import Input from './Input';
import Field from './Field';
import Group from './Group';

type FormProps = SUIFormProps & {
    className? : string,
    standalone? : boolean
};

Form.Input = Input;
Form.Field = Field;
Form.Group = Group;

let _standalone=true;

export function Form({ standalone=true, ...props } : FormProps): React.ReactElement{
	_standalone = standalone;
	return <StyledForm {...props} />;
}

const StyledForm = styled(SUIForm)`
    background-color: ${(): string => _standalone ? '#FFF' : 'default'};
    padding: ${(): string => _standalone ? '2rem 3rem 3rem 3rem' : '0'};
    margin-top: ${(): string => _standalone ? ' 4rem' : '0'};
    border: ${(): string => _standalone ? '1px solid #EEE' : 'none'};

    h3 {
        margin-bottom: 3rem;
    }

    .field {
        label {
            font-weight: 500;
        }
    }

    .text-muted {
        color: grey_primary;

        a {
            color: grey_primary;
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: grey_primary;
        }
    }

    &.ui.form {

        .field
            > label {
                font-size: input_text_size;
                font-weight: 500;
                color: black_primary !important;
                margin-bottom: 0.6rem;
        }

        .fields {
            margin-bottom: 2rem;
    
            @media only screen and (max-width: 767px) {
                margin-bottom: 1.25rem;
            }
        }

        input:not([type]), input[type=date], input[type=datetime-local], input[type=email], 
        input[type=file], input[type=number], input[type=password], input[type=search], input[type=tel], 
        input[type=text], input[type=time], input[type=url] {
            font-family: 'Roboto';
            font-size: 1.3rem;
            color: black_primary;
            border: 1 px solid #EEE;
            border-color: grey_light;
            border-radius: 0rem;
            text-indent: 0rem;
            padding: 1rem;
            &:focus {
                font-family: 'Roboto';
                font-size: 1.3rem;
                color: black_text;
                border-color: grey_primary;
                border-radius: 0rem;
            }
            &:hover {
                border-color: grey_secondary;
            }
        }

        input::selection, textarea::selection {
            color: black_text;
            background-color: grey_light;
        }

    @media only screen and (max-width: 576px) {
        margin-top: 0rem;
        padding: 2rem;
    }
`;