import setLocaleMutation from 'lib/apollo/mutations/setLocale.graphql'
import signOutMutation from 'lib/apollo/mutations/signOut.graphql'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import NavBar from './NavBar'

export default compose(
  withRouter,

  graphql(localeQuery, {
    props: ({ data }) => ({ localeCode: data.locale.code }),
  }),

  graphql(setLocaleMutation, {
    props: ({ mutate }) => ({
      setLocale: code => mutate({ variables: { code } }),
    }),
  }),

  graphql(signOutMutation, {
    props: ({ mutate }) => ({
      signOut: () => mutate(),
    }),
  }),
)(NavBar)
