import { graphql } from 'react-apollo'
import UserListQuery from './UserList.graphql'
import UserList from './UserList'

export default graphql(UserListQuery, {
  props: ({ data }) => data,
})(UserList)
