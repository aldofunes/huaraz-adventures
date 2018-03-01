import localeQuery from 'lib/apollo/queries/locale.graphql'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Footer from './Footer'

export default compose(
  withRouter,

  graphql(localeQuery, {
    props: ({ data }) => ({ localeCode: data.locale.code }),
  }),
)(Footer)
