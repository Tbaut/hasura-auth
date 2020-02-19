import gql from 'graphql-tag';
import { commentFields } from '../../fragments/comments';

const onchainLinkProposal = gql`
    fragment onchainLinkProposal on onchain_links {
        id,
        proposer_address,
        onchain_proposal_id,
        onchain_referendum_id,
        onchain_proposal(where: {}) {
            id
            depositAmount
            proposalStatus(last: 1) {
                id
                status
            }
            preimage {
                hash
                id
                metaDescription
                method
                preimageArguments {
                    id
                    name
                    value
                }
            }
        }
    }
`;

const proposalPost = gql`
    fragment proposalPost on posts {
        author {
            id
            name
            username
        }
        content
        created_at
        id
        updated_at
        comments(order_by: {created_at: asc}) {
            ...commentFields
        }
        onchain_link{
            ...onchainLinkProposal
        }
        title
        topic {
            id
            name
        }
        type {
            id
            name
        }
    }
    ${commentFields}
    ${onchainLinkProposal}
`;

export const QUERY_PROPOSAL_POST_AND_COMMENTS = gql`
    query ProposalPostAndComments ($id:Int!) {
        posts(where: {onchain_link: {onchain_proposal_id: {_eq: $id}}}) {
            ...proposalPost
        }
    }
    ${proposalPost}
`;

