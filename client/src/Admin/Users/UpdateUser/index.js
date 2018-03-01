import { compose, graphql } from 'react-apollo'
import UpdateUserQuery from './UpdateUser.graphql'
import UpdateUser from './UpdateUser'
import updateUserMutation from './updateUserMutation.graphql'

export default compose(
  graphql(UpdateUserQuery, {
    options: ({ match: { params } }) => ({ variables: { id: params.id } }),
  }),

  graphql(updateUserMutation, {
    props: ({ ownProps: { match: { params } }, mutate }) => ({
      updateUser: variables => mutate({
        variables: { id: params.id, ...variables },

        optimisticResponse: {
          updateUser: {
            __typename: 'User',
            id: params.id,
            ...variables,
          },
        },

        update: (store, { data: { updateUser } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: UpdateUserQuery,
            variables: { id: params.id },
          })
          // Add from the mutation to the end.
          data.user = updateUser
          // Write our data back to the cache.
          store.writeQuery({
            data,
            query: UpdateUserQuery,
            variables: { id: params.id },
          })
        },
      }),
    }),
  }),
)(UpdateUser)
