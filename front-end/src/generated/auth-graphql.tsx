import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type LoginResponse = {
   __typename?: 'LoginResponse',
  user?: Maybe<User>,
  token?: Maybe<Scalars['String']>,
};

export type Message = {
   __typename?: 'Message',
  message?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  login?: Maybe<LoginResponse>,
  logout?: Maybe<Message>,
  signup?: Maybe<LoginResponse>,
  changeEmail?: Maybe<Message>,
  changePassword?: Maybe<Message>,
  changeName?: Maybe<Message>,
  verifyEmail?: Maybe<Message>,
};


export type MutationLoginArgs = {
  username: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignupArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String'],
  name?: Maybe<Scalars['String']>
};


export type MutationChangeEmailArgs = {
  email: Scalars['String']
};


export type MutationChangePasswordArgs = {
  oldPassword: Scalars['String'],
  newPassword: Scalars['String']
};


export type MutationChangeNameArgs = {
  newName: Scalars['String']
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  user?: Maybe<User>,
  users?: Maybe<Array<Maybe<User>>>,
  token?: Maybe<Token>,
};


export type QueryUserArgs = {
  id: Scalars['Int']
};

export type Token = {
   __typename?: 'Token',
  token?: Maybe<Scalars['String']>,
};


export type User = {
   __typename?: 'User',
  id?: Maybe<Scalars['Int']>,
  username?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  email_verified?: Maybe<Scalars['String']>,
};

export type SignupMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String'],
  name?: Maybe<Scalars['String']>
};


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )> }
);


export const SignupDocument = gql`
    mutation SIGNUP($email: String!, $password: String!, $username: String!, $name: String) {
  signup(email: $email, password: $password, username: $username, name: $name) {
    user {
      id
    }
    token
  }
}
    `;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;