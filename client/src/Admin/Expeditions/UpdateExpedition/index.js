import { compose, graphql } from 'react-apollo'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import EditExpeditionQuery from './EditExpedition.graphql'
import updateExpeditionMutation from './updateExpedition.graphql'
import EditExpedition from './UpdateExpedition'

export default compose(
  graphql(localeQuery, { props: ({ data }) => ({ localeCode: data.locale.code }) }),

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
