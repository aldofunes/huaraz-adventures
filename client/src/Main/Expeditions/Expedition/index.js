import localeQuery from 'lib/apollo/queries/locale.graphql'
import { compose, graphql } from 'react-apollo'
import Expedition from './Expedition'
import ExpeditionQuery from './Expedition.graphql'

export default compose(
  graphql(localeQuery, {
    props: ({ data }) => ({ localeCode: data.locale.code }),
  }),

  graphql(ExpeditionQuery, {
    options: ({ match, localeCode }) => ({ variables: { id: match.params.id, localeCode } }),
  }),
)(Expedition)
