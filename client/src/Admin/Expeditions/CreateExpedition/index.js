import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import ExpeditionListQuery from '../ExpeditionList/ExpeditionList.graphql'
import createExpeditionMutation from './createExpedition.graphql'
import ExpeditionNew from './CreateExpedition'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(createExpeditionMutation, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      createExpedition: variables => mutate({
        variables: { ...variables, localeCode },

        update: (store, { data: { createExpedition } }) => {
          if (createExpedition) {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: ExpeditionListQuery, variables: { localeCode } })
            // Remove item from the data
            data.expeditions = data.expeditions.concat(createExpedition)
            // Write our data back to the cache.
            store.writeQuery({ data, query: ExpeditionListQuery, variables: { localeCode } })
          }
        },
      }),
    }),
  }),
)(ExpeditionNew)
