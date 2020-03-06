// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import gql from 'graphql-tag';

export const QUERY_LATEST_TREASURY_PROPOSALS = gql`
  query LatestDemocracyTreasuryProposalPosts($postType: Int!, $postTopic: Int!, $limit: Int! = 5 ) {
    posts(limit: $limit, where: {
        type: {
            id: {
                _eq: $postType
            }
        },
        topic: {
            id: {
                _eq: $postTopic
            }
        },
        onchain_link: {
            onchain_treasury_proposal_id: {
                _is_null: false
            },
            onchain_motion_id: {
                _is_null: true
            }
        }
    }, order_by: {
        onchain_link: {
            onchain_treasury_proposal_id: desc
        }
    }) {
        id
        title
        author {
            id
            username
            name
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
        topic {
            id
            name
        }
        onchain_link {
            id
            onchain_treasury_proposal_id
            onchain_treasury_spend_proposal(where: {}) {
                id
                treasuryStatus(last: 1) {
                    id
                    status
                }
            }
        }
    }
}`;
