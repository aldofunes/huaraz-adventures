import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import EditTourQuery from './EditTour.graphql'
import updateTour from './updateTour.graphql'
import EditTour from './EditTour'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(EditTourQuery, {
    options: ({ match: { params }, localeCode }) => ({
      variables: { id: params.id, localeCode }
    }),
    props: ({ data }) => data,
  }),

  graphql(updateTour, {
    props: ({ ownProps: { match: { params }, localeCode }, mutate }) => ({
      updateTour: variables => mutate({
        variables: { id: params.id, ...variables, localeCode } ,

        // TODO: Optimistic UI
      })
    }),
  }),
)(EditTour)
