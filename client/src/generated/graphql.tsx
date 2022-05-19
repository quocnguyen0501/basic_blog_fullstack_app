import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CreatePostInput = {
  content: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['Float'];
};

export type ErrorMutationResponse = IMutaionResponse & {
  __typename?: 'ErrorMutationResponse';
  code: Scalars['Float'];
  errors: Array<FieldError>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type IMutaionResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Array<UserUnionMutationResponse>;
  createPost: Array<PostUnionMutationResponse>;
  deletePost: Array<PostUnionMutationResponse>;
  forgotPassword: Scalars['Boolean'];
  login: Array<UserUnionMutationResponse>;
  logout: Scalars['Boolean'];
  register?: Maybe<Array<UserUnionMutationResponse>>;
  updatePost: Array<PostUnionMutationResponse>;
  vote: Array<PostUnionMutationResponse>;
};


export type MutationChangePasswordArgs = {
  newPasswordInput: NewPasswordInput;
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationVoteArgs = {
  inputVoteValue: VoteType;
  postId: Scalars['Int'];
};

export type NewPasswordInput = {
  newPassword: Scalars['String'];
};

export type PaginatedPost = {
  __typename?: 'PaginatedPost';
  hasMore: Scalars['Boolean'];
  paginatedPosts: Array<Post>;
  timeCompareCreatedAt: Scalars['DateTime'];
  totalPost: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  contentSnippet: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  points: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Float'];
};

export type PostMutationResponse = IMutaionResponse & {
  __typename?: 'PostMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type PostUnionMutationResponse = ErrorMutationResponse | PostMutationResponse;

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  loginProfile?: Maybe<User>;
  post?: Maybe<Post>;
  posts?: Maybe<PaginatedPost>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  limit: Scalars['Int'];
  timeCompareCreatedAt?: InputMaybe<Scalars['String']>;
};

export type RegisterInput = {
  day: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  month: Scalars['String'];
  password: Scalars['String'];
  surname: Scalars['String'];
  year: Scalars['String'];
};

export type UpdatePostInput = {
  content: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  dateOfBirth: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['ID'];
  surname: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserMutationResponse = IMutaionResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type UserUnionMutationResponse = ErrorMutationResponse | UserMutationResponse;

export enum VoteType {
  DownVote = 'DOWN_VOTE',
  UpVote = 'UP_VOTE'
}

type CommonState_ErrorMutationResponse_Fragment = { __typename?: 'ErrorMutationResponse', code: number, success: boolean, message?: string | null };

type CommonState_PostMutationResponse_Fragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null };

type CommonState_UserMutationResponse_Fragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

export type CommonStateFragment = CommonState_ErrorMutationResponse_Fragment | CommonState_PostMutationResponse_Fragment | CommonState_UserMutationResponse_Fragment;

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

type PostUnionMutationResponse_ErrorMutationResponse_Fragment = { __typename?: 'ErrorMutationResponse', code: number, success: boolean, message?: string | null, errors: Array<{ __typename?: 'FieldError', field: string, message: string }> };

type PostUnionMutationResponse_PostMutationResponse_Fragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, userId: number, title: string, content: string, contentSnippet: string, points: number, updatedAt: any, createdAt: any, user: { __typename?: 'User', id: string, surname: string, firstName: string, dateOfBirth: any, gender: string, createdAt: any, updatedAt: any } } | null };

export type PostUnionMutationResponseFragment = PostUnionMutationResponse_ErrorMutationResponse_Fragment | PostUnionMutationResponse_PostMutationResponse_Fragment;

export type PostWithUserInfoFragment = { __typename?: 'Post', id: string, userId: number, title: string, content: string, contentSnippet: string, points: number, updatedAt: any, createdAt: any, user: { __typename?: 'User', id: string, surname: string, firstName: string, dateOfBirth: any, gender: string, createdAt: any, updatedAt: any } };

export type UserFragment = { __typename?: 'User', id: string, firstName: string, surname: string, email: string, dateOfBirth: any, gender: string };

type UserUnionMutationResponse_ErrorMutationResponse_Fragment = { __typename?: 'ErrorMutationResponse', code: number, success: boolean, message?: string | null, errors: Array<{ __typename?: 'FieldError', field: string, message: string }> };

type UserUnionMutationResponse_UserMutationResponse_Fragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, firstName: string, surname: string, email: string, dateOfBirth: any, gender: string } | null };

export type UserUnionMutationResponseFragment = UserUnionMutationResponse_ErrorMutationResponse_Fragment | UserUnionMutationResponse_UserMutationResponse_Fragment;

export type ChangePasswordMutationVariables = Exact<{
  userId: Scalars['String'];
  token: Scalars['String'];
  newPasswordInput: NewPasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: Array<{ __typename?: 'ErrorMutationResponse', code: number, success: boolean, message?: string | null, errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } | { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, firstName: string, surname: string, email: string, dateOfBirth: any, gender: string } | null }> };

export type CreateNewPostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreateNewPostMutation = { __typename?: 'Mutation', createPost: Array<{ __typename?: 'ErrorMutationResponse', code: number, success: boolean, message?: string | null, errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } | { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, userId: number, title: string, content: string, contentSnippet: string, points: number, updatedAt: any, createdAt: any, user: { __typename?: 'User', id: string, surname: string, firstName: string, dateOfBirth: any, gender: string, createdAt: any, updatedAt: any } } | null }> };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: Array<{ __typename?: 'ErrorMutationResponse', code: number, success: boolean, message?: string | null } | { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null }> };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: Array<{ __typename?: 'ErrorMutationResponse', code: number, success: boolean, message?: string | null, errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } | { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, firstName: string, surname: string, email: string, dateOfBirth: any, gender: string } | null }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Array<{ __typename?: 'ErrorMutationResponse', code: number, success: boolean, message?: string | null, errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } | { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, firstName: string, surname: string, email: string, dateOfBirth: any, gender: string } | null }> | null };

export type UpdatePostMutationVariables = Exact<{
  updatePostInput: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: Array<{ __typename?: 'ErrorMutationResponse', code: number, success: boolean, message?: string | null, errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } | { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, userId: number, title: string, content: string, contentSnippet: string, points: number, updatedAt: any, createdAt: any, user: { __typename?: 'User', id: string, surname: string, firstName: string, dateOfBirth: any, gender: string, createdAt: any, updatedAt: any } } | null }> };

export type VoteMutationVariables = Exact<{
  inputVoteValue: VoteType;
  postId: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: Array<{ __typename?: 'ErrorMutationResponse', code: number, success: boolean, message?: string | null, errors: Array<{ __typename?: 'FieldError', field: string, message: string }> } | { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, userId: number, title: string, content: string, contentSnippet: string, points: number, updatedAt: any, createdAt: any, user: { __typename?: 'User', id: string, surname: string, firstName: string, dateOfBirth: any, gender: string, createdAt: any, updatedAt: any } } | null }> };

export type LoginProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type LoginProfileQuery = { __typename?: 'Query', loginProfile?: { __typename?: 'User', id: string, firstName: string, surname: string, email: string, dateOfBirth: any, gender: string } | null };

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, userId: number, title: string, content: string, contentSnippet: string, points: number, updatedAt: any, createdAt: any, user: { __typename?: 'User', id: string, surname: string, firstName: string, dateOfBirth: any, gender: string, createdAt: any, updatedAt: any } } | null };

export type PostIDsQueryVariables = Exact<{
  limit: Scalars['Int'];
  timeCompareCreatedAt?: InputMaybe<Scalars['String']>;
}>;


export type PostIDsQuery = { __typename?: 'Query', posts?: { __typename?: 'PaginatedPost', paginatedPosts: Array<{ __typename?: 'Post', id: string }> } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  timeCompareCreatedAt?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PaginatedPost', totalPost: number, timeCompareCreatedAt: any, hasMore: boolean, paginatedPosts: Array<{ __typename?: 'Post', id: string, userId: number, title: string, content: string, contentSnippet: string, points: number, updatedAt: any, createdAt: any, user: { __typename?: 'User', id: string, surname: string, firstName: string, dateOfBirth: any, gender: string, createdAt: any, updatedAt: any } }> } | null };

export const CommonStateFragmentDoc = gql`
    fragment commonState on IMutaionResponse {
  code
  success
  message
}
    `;
export const PostWithUserInfoFragmentDoc = gql`
    fragment postWithUserInfo on Post {
  id
  userId
  title
  content
  contentSnippet
  points
  user {
    id
    surname
    firstName
    dateOfBirth
    gender
    createdAt
    updatedAt
  }
  updatedAt
  createdAt
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
}
    `;
export const PostUnionMutationResponseFragmentDoc = gql`
    fragment postUnionMutationResponse on PostUnionMutationResponse {
  ... on PostMutationResponse {
    ...commonState
    post {
      ...postWithUserInfo
    }
  }
  ... on ErrorMutationResponse {
    ...commonState
    errors {
      ...fieldError
    }
  }
}
    ${CommonStateFragmentDoc}
${PostWithUserInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment user on User {
  id
  firstName
  surname
  email
  dateOfBirth
  gender
}
    `;
export const UserUnionMutationResponseFragmentDoc = gql`
    fragment userUnionMutationResponse on UserUnionMutationResponse {
  ... on UserMutationResponse {
    ...commonState
    user {
      ...user
    }
  }
  ... on ErrorMutationResponse {
    ...commonState
    errors {
      ...fieldError
    }
  }
}
    ${CommonStateFragmentDoc}
${UserFragmentDoc}
${FieldErrorFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($userId: String!, $token: String!, $newPasswordInput: NewPasswordInput!) {
  changePassword(
    userId: $userId
    token: $token
    newPasswordInput: $newPasswordInput
  ) {
    ...userUnionMutationResponse
  }
}
    ${UserUnionMutationResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *      newPasswordInput: // value for 'newPasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateNewPostDocument = gql`
    mutation CreateNewPost($createPostInput: CreatePostInput!) {
  createPost(createPostInput: $createPostInput) {
    ... on PostMutationResponse {
      code
      success
      message
      post {
        ...postWithUserInfo
      }
    }
    ... on ErrorMutationResponse {
      code
      success
      message
      errors {
        ...fieldError
      }
    }
  }
}
    ${PostWithUserInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export type CreateNewPostMutationFn = Apollo.MutationFunction<CreateNewPostMutation, CreateNewPostMutationVariables>;

/**
 * __useCreateNewPostMutation__
 *
 * To run a mutation, you first call `useCreateNewPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewPostMutation, { data, loading, error }] = useCreateNewPostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreateNewPostMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewPostMutation, CreateNewPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewPostMutation, CreateNewPostMutationVariables>(CreateNewPostDocument, options);
      }
export type CreateNewPostMutationHookResult = ReturnType<typeof useCreateNewPostMutation>;
export type CreateNewPostMutationResult = Apollo.MutationResult<CreateNewPostMutation>;
export type CreateNewPostMutationOptions = Apollo.BaseMutationOptions<CreateNewPostMutation, CreateNewPostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
    ... on PostMutationResponse {
      ...commonState
    }
    ... on ErrorMutationResponse {
      ...commonState
    }
  }
}
    ${CommonStateFragmentDoc}`;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
  forgotPassword(forgotPasswordInput: $forgotPasswordInput)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPasswordInput: // value for 'forgotPasswordInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ... on UserMutationResponse {
      ...commonState
      user {
        ...user
      }
    }
    ... on ErrorMutationResponse {
      ...commonState
      errors {
        ...fieldError
      }
    }
  }
}
    ${CommonStateFragmentDoc}
${UserFragmentDoc}
${FieldErrorFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    ... on UserMutationResponse {
      ...commonState
      user {
        ...user
      }
    }
    ... on ErrorMutationResponse {
      ...commonState
      errors {
        ...fieldError
      }
    }
  }
}
    ${CommonStateFragmentDoc}
${UserFragmentDoc}
${FieldErrorFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($updatePostInput: UpdatePostInput!) {
  updatePost(updatePostInput: $updatePostInput) {
    ...postUnionMutationResponse
  }
}
    ${PostUnionMutationResponseFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($inputVoteValue: VoteType!, $postId: Int!) {
  vote(inputVoteValue: $inputVoteValue, postId: $postId) {
    ...postUnionMutationResponse
  }
}
    ${PostUnionMutationResponseFragmentDoc}`;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      inputVoteValue: // value for 'inputVoteValue'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const LoginProfileDocument = gql`
    query loginProfile {
  loginProfile {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useLoginProfileQuery__
 *
 * To run a query within a React component, call `useLoginProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoginProfileQuery(baseOptions?: Apollo.QueryHookOptions<LoginProfileQuery, LoginProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginProfileQuery, LoginProfileQueryVariables>(LoginProfileDocument, options);
      }
export function useLoginProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginProfileQuery, LoginProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginProfileQuery, LoginProfileQueryVariables>(LoginProfileDocument, options);
        }
export type LoginProfileQueryHookResult = ReturnType<typeof useLoginProfileQuery>;
export type LoginProfileLazyQueryHookResult = ReturnType<typeof useLoginProfileLazyQuery>;
export type LoginProfileQueryResult = Apollo.QueryResult<LoginProfileQuery, LoginProfileQueryVariables>;
export const PostDocument = gql`
    query Post($id: ID!) {
  post(id: $id) {
    ...postWithUserInfo
  }
}
    ${PostWithUserInfoFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostIDsDocument = gql`
    query postIDs($limit: Int!, $timeCompareCreatedAt: String) {
  posts(limit: $limit, timeCompareCreatedAt: $timeCompareCreatedAt) {
    paginatedPosts {
      id
    }
  }
}
    `;

/**
 * __usePostIDsQuery__
 *
 * To run a query within a React component, call `usePostIDsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostIDsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostIDsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      timeCompareCreatedAt: // value for 'timeCompareCreatedAt'
 *   },
 * });
 */
export function usePostIDsQuery(baseOptions: Apollo.QueryHookOptions<PostIDsQuery, PostIDsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostIDsQuery, PostIDsQueryVariables>(PostIDsDocument, options);
      }
export function usePostIDsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostIDsQuery, PostIDsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostIDsQuery, PostIDsQueryVariables>(PostIDsDocument, options);
        }
export type PostIDsQueryHookResult = ReturnType<typeof usePostIDsQuery>;
export type PostIDsLazyQueryHookResult = ReturnType<typeof usePostIDsLazyQuery>;
export type PostIDsQueryResult = Apollo.QueryResult<PostIDsQuery, PostIDsQueryVariables>;
export const PostsDocument = gql`
    query posts($limit: Int!, $timeCompareCreatedAt: String) {
  posts(limit: $limit, timeCompareCreatedAt: $timeCompareCreatedAt) {
    totalPost
    timeCompareCreatedAt
    hasMore
    paginatedPosts {
      ...postWithUserInfo
    }
  }
}
    ${PostWithUserInfoFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      timeCompareCreatedAt: // value for 'timeCompareCreatedAt'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;