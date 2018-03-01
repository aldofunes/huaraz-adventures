import { compose, graphql } from 'react-apollo'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import ExpeditionListQuery from './ExpeditionList.graphql'
import ExpeditionList from './ExpeditionList'

export default compose(
  graphql(localeQuery, {
    props: ({ data }) => ({ localeCode: data.locale.code }),
  }),

  graphql(ExpeditionListQuery, {
    options: ({ localeCode, limit }) => ({ variables: { localeCode, limit } }),
  }),
)(ExpeditionList)
