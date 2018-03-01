import { graphql, compose } from 'react-apollo'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import ExpeditionListQuery from './ExpeditionList.graphql'
import ExpeditionList from './ExpeditionList'

export default compose(
  graphql(localeQuery, { props: ({ data }) => ({ localeCode: data.locale.code }) }),

  graphql(ExpeditionListQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),
)(ExpeditionList)
