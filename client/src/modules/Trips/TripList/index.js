import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'

import TripListQuery from './TripList.graphql'
import TripList from './TripList'

export default compose(
  connect(state => ({ locale: state.locale })),
  graphql(TripListQuery, {
    options: ({ locale }) => ({ variables: { localeCode: locale.code } }),
    props: ({ data }) => data,
  }),
)(TripList)
