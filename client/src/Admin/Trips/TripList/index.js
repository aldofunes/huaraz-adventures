import localeQuery from 'lib/apollo/queries/locale.graphql'
import { compose, graphql } from 'react-apollo'
import TripList from './TripList'
import TripListQuery from './TripList.graphql'

export default compose(
  graphql(localeQuery, {
    props: ({ data }) => ({ localeCode: data.locale.code }),
  }),

  graphql(TripListQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),
)(TripList)
