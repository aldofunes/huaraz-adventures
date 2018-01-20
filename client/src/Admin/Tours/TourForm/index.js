import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import TourFormQuery from './TourForm.graphql'
import TourForm from './TourForm'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(TourFormQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),
)(TourForm)
