import { compose, graphql } from 'react-apollo'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import { withRouter } from 'react-router-dom'
import TripFormQuery from './TripForm.graphql'
import TripForm from './TripForm'

export default compose(
  graphql(localeQuery, { props: ({ data }) => ({ localeCode: data.locale.code }) }),

  withRouter,

  graphql(TripFormQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),
)(TripForm)
