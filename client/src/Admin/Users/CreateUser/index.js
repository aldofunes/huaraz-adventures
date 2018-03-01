import { graphql } from 'react-apollo'
import UserListQuery from '../UserList/UserList.graphql'
import CreateUser from './CreateUser'
import createUserMutation from './createUser.graphql'

export default graphql(createUserMutation, {
  props: ({ mutate }) => ({
    createUser: variables => mutate({
      variables,

      update: (store, { data: { createUser } }) => {
        if (createUser) {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: UserListQuery })
          // Remove item from the data
          data.users = data.users.concat(createUser)
          // Write our data back to the cache.
          store.writeQuery({ data, query: UserListQuery })
        }
      },
    }),
  }),
})(CreateUser)
