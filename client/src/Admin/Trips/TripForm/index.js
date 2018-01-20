import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TripFormQuery from './TripForm.graphql'
import TripForm from './TripForm'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  withRouter,

  graphql(TripFormQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),
)(TripForm)
