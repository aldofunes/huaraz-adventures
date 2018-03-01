import localeQuery from 'lib/apollo/queries/locale.graphql'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import TripListQuery from '../TripList.graphql'
import deleteTripMutation from './deleteTrip.graphql'
import TripListItem from './TripListItem'

export default compose(
  withRouter,

  graphql(localeQuery, {
    props: ({ data }) => ({ localeCode: data.locale.code }),
  }),

  graphql(deleteTripMutation, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      deleteTrip: variables => mutate({
        variables,

        update: (store, { data: { deleteTrip } }) => {
          if (deleteTrip) {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: TripListQuery, variables: { localeCode } })
            // Remove item from the data
            data.trips = data.trips.filter(item => item.id !== variables.id)
            // Write our data back to the cache.
            store.writeQuery({ data, query: TripListQuery, variables: { localeCode } })
          }
        },
      }),
    }),
  }),
)(TripListItem)
