import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import TourListQuery from '../TourList/TourList.graphql'
import createTour from './createTour.graphql'
import TourNew from './TourNew'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(createTour, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      createTour: variables => mutate({
        variables: { ...variables, localeCode },

        update: (store, { data: { createTour } }) => {
          if (createTour) {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: TourListQuery, variables: { localeCode } })
            // Remove item from the data
            data.tours = data.tours.concat(createTour)
            // Write our data back to the cache.
            store.writeQuery({ data, query: TourListQuery, variables: { localeCode } })
          }
        },
      }),
    }),
  }),
)(TourNew)
