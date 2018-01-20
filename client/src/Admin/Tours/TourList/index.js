import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import TourListQuery from './TourList.graphql'
import TourList from './TourList'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(TourListQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),
)(TourList)
