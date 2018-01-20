import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import deleteUser from './deleteUser.graphql'
import UserListQuery from '../UserList.graphql'
import UserListItem from './UserListItem'

export default compose(
  withRouter,

  graphql(deleteUser, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      deleteUser: variables => mutate({
        variables,

        update: (store, { data: { deleteUser } }) => {
          if (deleteUser) {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: UserListQuery })
            // Remove item from the data
            data.users = data.users.filter(item => item.id !== variables.id)
            // Write our data back to the cache.
            store.writeQuery({ data, query: UserListQuery })
          }
        },
      }),
    }),
  }),
)(UserListItem)
