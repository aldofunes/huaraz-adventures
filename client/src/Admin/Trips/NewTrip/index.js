import { compose, graphql } from 'react-apollo'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import TripListQuery from '../TripList/TripList.graphql'
import createTrip from './createTrip.graphql'
import NewTrip from './NewTrip'

export default compose(
  graphql(localeQuery, { props: ({ data }) => ({ localeCode: data.locale.code }) }),

  graphql(createTrip, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      createTrip: variables => mutate({
        variables: { ...variables, localeCode },

        update: (store, { data: { createTrip } }) => {
          if (createTrip) {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: TripListQuery, variables: { localeCode } })
            // Remove item from the data
            data.trips = data.trips.concat(createTrip)
            // Write our data back to the cache.
            store.writeQuery({ data, query: TripListQuery, variables: { localeCode } })
          }
        },
      }),
    }),
  }),
)(NewTrip)
