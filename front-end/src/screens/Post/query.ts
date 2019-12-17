import gql from 'graphql-tag';

const commentFields = gql`
    fragment commentFields on comments {
        author {
            id
            username
        }
        content
        created_at
        id
        updated_at
    }
`

const commentRecursive = gql`
    fragment commentRecursive on comments {       
        ...commentFields
        comments {
            ...commentFields
            comments {
                ...commentFields
            }
        }
    }
    ${commentFields}
`

const post = gql`
    fragment post on posts {
        author {
            id
            username
        }
        content
        created_at
        id
        updated_at
        comments(where: {parent_comment_id: {_is_null: true}}, order_by: {created_at: asc}) {
            ...commentRecursive
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
    ${commentRecursive}
`

export const QUERY_POST_AND_COMMENTS = gql`
    query PostAndComments ($id:Int!) {
        posts(where: {id: {_eq: $id}}) {
            ...post
        }
    }
    ${post}
`;

export const EDIT_POST= gql`
    mutation EditPost ($id: Int!, $content: String!, $title: String!) {
        update_posts(where: {id: {_eq: $id}}, _set: {content: $content, title: $title}) {
        affected_rows
        }
  }
`