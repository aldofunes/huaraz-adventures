import { compose, graphql } from 'react-apollo'
import localeQuery from 'lib/apollo/queries/locale.graphql'
import createContactMutation from './createContact.graphql'
import ContactForm from './ContactForm'

export default compose(
  graphql(localeQuery, {
    props: ({ data }) => ({ localeCode: data.locale.code }),
  }),

  graphql(createContactMutation, {
    props: ({ mutate }) => ({
      createContact: variables => mutate({ variables }),
    }),
  }),
)(ContactForm)
