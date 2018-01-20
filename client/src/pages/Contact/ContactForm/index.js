import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import createContactMutation from './createContact.graphql'
import ContactForm from './ContactForm'

export default compose(
  connect(state => ({ locale: state.locale })),

  graphql(createContactMutation, {
    props: ({ mutate }) => ({
      createContact: variables => mutate({ variables }),
    }),
  }),
)(ContactForm)
