import setJwtMutation from 'lib/apollo/mutations/setJwt.graphql'
import { graphql } from 'react-apollo'
import SignIn from './SignIn'

export default graphql(setJwtMutation, {
  props: ({ mutate }) => ({
    setJwt: jwt => mutate({ variables: { jwt } }),
  }),
})(SignIn)
