import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import deleteTour from './deleteTour.graphql'
import TourListQuery from '../TourList.graphql'
import TourListItem from './TourListItem'

export default compose(
  withRouter,

  connect(state => ({ localeCode: state.locale.code })),

  graphql(deleteTour, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      deleteTour: variables => mutate({
        variables,

        update: (store, { data: { deleteTour } }) => {
          if (deleteTour) {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: TourListQuery, variables: { localeCode } })
            // Remove item from the data
            data.tours = data.tours.filter(item => item.id !== variables.id)
            // Write our data back to the cache.
            store.writeQuery({ data, query: TourListQuery, variables: { localeCode } })
          }
        },
      }),
    }),
  }),
)(TourListItem)
