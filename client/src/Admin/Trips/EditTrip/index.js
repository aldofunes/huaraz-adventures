import { compose, graphql } from 'react-apollo'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import EditTripQuery from './EditTrip.graphql'
import updateTrip from './updateTrip.graphql'
import EditTrip from './EditTrip'

export default compose(
  graphql(localeQuery, { props: ({ data }) => ({ localeCode: data.locale.code }) }),

  graphql(EditTripQuery, {
    options: ({ match: { params }, localeCode }) => ({
      variables: { id: params.id, localeCode },
    }),
    props: ({ data }) => data,
  }),

  graphql(updateTrip, {
    props: ({ ownProps: { match: { params }, localeCode }, mutate }) => ({
      updateTrip: variables => mutate({
        variables: { id: params.id, ...variables, localeCode },

        // TODO: Optimistic UI
      }),
    }),
  }),
)(EditTrip)
