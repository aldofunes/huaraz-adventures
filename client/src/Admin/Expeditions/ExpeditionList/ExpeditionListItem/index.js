import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import deleteExpedition from './deleteExpedition.graphql'
import ExpeditionListQuery from '../ExpeditionList.graphql'
import ExpeditionListItem from './ExpeditionListItem'

export default compose(
  withRouter,

  connect(state => ({ localeCode: state.locale.code })),

  graphql(deleteExpedition, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      deleteExpedition: variables => mutate({
        variables,

        update: (store, { data: { deleteExpedition } }) => {
          if (deleteExpedition) {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: ExpeditionListQuery, variables: { localeCode } })
            // Remove item from the data
            data.expeditions = data.expeditions.filter(item => item.id !== variables.id)
            // Write our data back to the cache.
            store.writeQuery({ data, query: ExpeditionListQuery, variables: { localeCode } })
          }
        },
      }),
    }),
  }),
)(ExpeditionListItem)
