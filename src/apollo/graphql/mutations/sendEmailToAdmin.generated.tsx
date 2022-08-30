import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendEmailToAdminMutationVariables = Types.Exact<{
  data: Types.EmailToAdminInput;
}>;


export type SendEmailToAdminMutation = { __typename?: 'Mutation', SendEmailToAdmin: { __typename?: 'StringResponse', status: boolean, message: string, data?: string | null } };


export const SendEmailToAdminDocument = gql`
    mutation SendEmailToAdmin($data: EmailToAdminInput!) {
  SendEmailToAdmin(data: $data) {
    status
    message
    data
  }
}
    `;
export type SendEmailToAdminMutationFn = Apollo.MutationFunction<SendEmailToAdminMutation, SendEmailToAdminMutationVariables>;

/**
 * __useSendEmailToAdminMutation__
 *
 * To run a mutation, you first call `useSendEmailToAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEmailToAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEmailToAdminMutation, { data, loading, error }] = useSendEmailToAdminMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendEmailToAdminMutation(baseOptions?: Apollo.MutationHookOptions<SendEmailToAdminMutation, SendEmailToAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendEmailToAdminMutation, SendEmailToAdminMutationVariables>(SendEmailToAdminDocument, options);
      }
export type SendEmailToAdminMutationHookResult = ReturnType<typeof useSendEmailToAdminMutation>;
export type SendEmailToAdminMutationResult = Apollo.MutationResult<SendEmailToAdminMutation>;
export type SendEmailToAdminMutationOptions = Apollo.BaseMutationOptions<SendEmailToAdminMutation, SendEmailToAdminMutationVariables>;