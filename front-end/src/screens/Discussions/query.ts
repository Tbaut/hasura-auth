// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import gql from 'graphql-tag';
import { authorFields } from 'src/fragments/author';

export const QUERY_LATEST_DISCUSSIONS = gql`
    query LatestDiscussionPosts($limit: Int! = 20, $offset: Int! = 0) {
        posts(order_by: {last_update: {last_update: desc}}, offset: $offset, limit: $limit, where: {type: {id: {_eq: 1}}}) {
            id
            title
            author {
                ...authorFields
            }
            created_at
            updated_at
            comments_aggregate {
                aggregate {
                    count
                }
            }
            type {
                name
                id
            }
            last_update {
                last_update
            }
        }
    }
    ${authorFields}
`;

