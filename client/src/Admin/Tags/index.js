import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import TagListQuery from './Tags.graphql'
import createTag from './createTag.graphql'
import Tags from './Tags'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(TagListQuery, {
    options: ({ localeCode }) => ({ variables: { localeCode } }),
    props: ({ data }) => data,
  }),

  graphql(createTag, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      createTag: () => mutate({
        update: (store, { data: { createTag } }) => {
          if (createTag) {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: TagListQuery, variables: { localeCode } })
            // Remove item from the data
            data.tags = data.tags.concat(createTag)
            // Write our data back to the cache.
            store.writeQuery({ data, query: TagListQuery, variables: { localeCode } })
          }
        },
      }),
    }),
  }),
)(Tags)
