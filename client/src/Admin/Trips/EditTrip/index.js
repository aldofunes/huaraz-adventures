import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import EditTripQuery from './EditTrip.graphql'
import updateTrip from './updateTrip.graphql'
import EditTrip from './EditTrip'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(EditTripQuery, {
    options: ({ match: { params }, localeCode }) => ({
      variables: { id: params.id, localeCode }
    }),
    props: ({ data }) => data,
  }),

  graphql(updateTrip, {
    props: ({ ownProps: { match: { params }, localeCode }, mutate }) => ({
      updateTrip: variables => mutate({
        variables: { id: params.id, ...variables, localeCode },

        // TODO: Optimistic UI
      })
    }),
  }),
)(EditTrip)
