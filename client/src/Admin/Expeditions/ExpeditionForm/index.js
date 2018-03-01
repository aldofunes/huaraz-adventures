import { compose, graphql } from 'react-apollo'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import ExpeditionFormQuery from './ExpeditionForm.graphql'
import ExpeditionForm from './ExpeditionForm'

export default compose(
  graphql(localeQuery, { props: ({ data }) => ({ localeCode: data.locale.code }) }),

  graphql(ExpeditionFormQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),
)(ExpeditionForm)
