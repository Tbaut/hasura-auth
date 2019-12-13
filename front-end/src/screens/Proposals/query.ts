import gql from 'graphql-tag';

export const QUERY_LATEST_PROPOSALS = gql`
    query LatestProposalPosts {
        posts(order_by: {created_at: desc}, limit: 20, where: {type: {id: {_eq: 2}}}) {
            id
            title
            author {
                username
            }
            created_at
            updated_at
            replies_aggregate {
                aggregate {
                    count
                }
            }
            type {
                name
                id
            }
        }
    }
`;