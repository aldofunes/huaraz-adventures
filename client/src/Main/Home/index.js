import localeQuery from 'lib/apollo/queries/locale.graphql'
import { graphql } from 'react-apollo'
import Home from './Home'

export default graphql(localeQuery, {
  props: ({ data }) => ({ localeCode: data.locale.code }),
})(Home)
