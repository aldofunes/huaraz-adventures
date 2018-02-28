import { compose, graphql } from 'react-apollo'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import TagListQuery from './TagList.graphql'
import TagList from './TagList'

export default compose(
  graphql(localeQuery, {
    props: ({ data }) => ({ localeCode: data.locale.code }),
  }),

  graphql(TagListQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
  }),
)(TagList)
