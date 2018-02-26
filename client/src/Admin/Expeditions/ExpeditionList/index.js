import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import ExpeditionListQuery from './ExpeditionList.graphql'
import ExpeditionList from './ExpeditionList'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(ExpeditionListQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),
)(ExpeditionList)
