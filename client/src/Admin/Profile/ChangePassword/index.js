import { graphql } from 'react-apollo'
import changePasswordMutation from './changePassword.graphql'
import ChangePassword from './ChangePassword'

export default graphql(changePasswordMutation, {
  props: ({ mutate }) => ({
    changePassword: variables => mutate({ variables }),
  }),
})(ChangePassword)
