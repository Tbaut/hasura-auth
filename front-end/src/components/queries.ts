// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import gql from 'graphql-tag';

export const GET_REFRESH_TOKEN = gql`
query GET_REFRESH_TOKEN {
    token {
        token
    }
}
`;
