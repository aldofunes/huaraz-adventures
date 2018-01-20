import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { actions } from 'lib/redux/auth'
import signIn from './signIn.graphql'
import SignIn from './SignIn'

export default compose(
  connect(
    null,
    dispatch => ({
      setJwt: (payload) => {
        dispatch(actions.signIn(payload))
      },
    }),
  ),

  graphql(signIn, {
    props: ({ mutate }) => ({
      signIn: variables => mutate({ variables }),
    }),
  }),
)(SignIn)
