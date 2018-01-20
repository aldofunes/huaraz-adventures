import { graphql } from 'react-apollo'
import ContactListQuery from './ContactList.graphql'
import ContactList from './ContactList'

export default graphql(ContactListQuery, {
  props: ({ data }) => data,
})(ContactList)
