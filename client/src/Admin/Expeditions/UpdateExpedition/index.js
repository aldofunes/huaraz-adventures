import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import EditExpeditionQuery from './EditExpedition.graphql'
import updateExpeditionMutation from './updateExpedition.graphql'
import EditExpedition from './UpdateExpedition'

export default compose(
  connect(state => ({ localeCode: state.locale.code })),

  graphql(EditExpeditionQuery, {
    options: ({ match: { params }, localeCode }) => ({
      variables: { id: params.id, localeCode },
    }),
    props: ({ data }) => data,
  }),

  graphql(updateExpeditionMutation, {
    props: ({ ownProps: { match: { params }, localeCode }, mutate }) => ({
      updateExpedition: variables => mutate({
        variables: { id: params.id, ...variables, localeCode },

        // TODO: Optimistic UI
      }),
    }),
  }),
)(EditExpedition)
