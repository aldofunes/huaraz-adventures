import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import TripListQuery from './TripList.graphql'
import TripList from './TripList'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(TripListQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),
)(TripList)
