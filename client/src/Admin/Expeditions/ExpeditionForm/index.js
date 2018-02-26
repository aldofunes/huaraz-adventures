import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import ExpeditionFormQuery from './ExpeditionForm.graphql'
import ExpeditionForm from './ExpeditionForm'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(ExpeditionFormQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),
)(ExpeditionForm)
