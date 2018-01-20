import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import deleteContact from './deleteContact.graphql'
import ContactListQuery from '../ContactList.graphql'
import ContactListItem from './ContactListItem'

export default compose(
  withRouter,

  connect(state => ({ locale: state.locale })),

  graphql(deleteContact, {
    props: ({ ownProps: { locale }, mutate }) => ({
      deleteContact: variables => mutate({
        variables,

        update: (store, { data: { deleteContact } }) => {
          if (deleteContact) {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: ContactListQuery,
              variables: { localeCode: locale.code },
            })
            // Remove item from the data
            data.posts = data.posts.filter(item => item.id !== variables.id)
            // Write our data back to the cache.
            store.writeQuery({
              data,
              query: ContactListQuery,
              variables: { localeCode: locale.code },
            })
          }
        },
      }),
    }),
  }),
)(ContactListItem)
