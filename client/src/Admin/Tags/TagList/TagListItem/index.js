import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import deleteTag from './deleteTag.graphql'
import updateTag from './updateTag.graphql'
import TagsQuery from '../../Tags.graphql'
import TagListItem from './TagListItem'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  withRouter,

  graphql(updateTag, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      updateTag: variables => mutate({
        variables: { ...variables, localeCode },

        // TODO: Optimistic UI
      }),
    }),
  }),

  graphql(deleteTag, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      deleteTag: variables => mutate({
        variables,

        update: (store, { data: { deleteTag } }) => {
          if (deleteTag) {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: TagsQuery, variables: { localeCode } })
            // Remove item from the data
            data.tags = data.tags.filter(item => item.id !== variables.id)
            // Write our data back to the cache.
            store.writeQuery({ data, query: TagsQuery, variables: { localeCode } })
          }
        },
      }),
    }),
  }),
)(TagListItem)
