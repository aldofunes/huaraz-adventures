import { compose, graphql } from 'react-apollo'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import UpdateExpeditionQuery from './UpdateExpedition.graphql'
import updateExpeditionMutation from './updateExpeditionMutation.graphql'
import UpdateExpedition from './UpdateExpedition'

export default compose(
  graphql(localeQuery, { props: ({ data }) => ({ localeCode: data.locale.code }) }),

  graphql(UpdateExpeditionQuery, {
    options: ({ match: { params }, localeCode }) => ({
      variables: { id: params.id, localeCode },
    }),
    props: ({ data }) => data,
  }),

  graphql(updateExpeditionMutation, {
    props: ({ ownProps: { match: { params }, localeCode }, mutate }) => ({
      updateExpedition: variables => mutate({
        variables: { id: params.id, ...variables, localeCode },

        optimisticResponse: {
          updateUser: {
            __typename: 'Expedition',
            id: params.id,
            localeCode,
            ...variables,
          },
        },

        update: (store, { data: { updateUser } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: UpdateExpeditionQuery,
            variables: { id: params.id, localeCode },
          })
          // Add from the mutation to the end.
          data.expedition = updateUser
          // Write our data back to the cache.
          store.writeQuery({
            data,
            query: UpdateExpeditionQuery,
            variables: { id: params.id, localeCode },
          })
        },
      }),
    }),
  }),
)(UpdateExpedition)
