import localeQuery from 'lib/apollo/queries/locale.graphql'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import ContactListQuery from '../ContactList.graphql'
import ContactListItem from './ContactListItem'
import deleteContactMutation from './deleteContact.graphql'

export default compose(
  withRouter,

  graphql(localeQuery, {
    props: ({ data }) => ({ localeCode: data.locale.code }),
  }),

  graphql(deleteContactMutation, {
    props: ({ ownProps: { localeCode }, mutate }) => ({
      deleteContact: variables => mutate({
        variables,

        update: (store, { data: { deleteContact } }) => {
          if (deleteContact) {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: ContactListQuery,
              variables: { localeCode: localeCode },
            })
            // Remove item from the data
            data.posts = data.posts.filter(item => item.id !== variables.id)
            // Write our data back to the cache.
            store.writeQuery({
              data,
              query: ContactListQuery,
              variables: { localeCode: localeCode },
            })
          }
        },
      }),
    }),
  }),
)(ContactListItem)
