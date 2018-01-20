import React from 'react'
import PropTypes from 'prop-types'
import { apolloErrorType, contactType } from 'lib/propTypes'
import { Error, Loading, Table } from 'components'
import ContactListItem from './ContactListItem'

const ContactList = ({ error, loading, contacts }) => {
  if (error) { return <Error error={error} size="xlarge" /> }
  if (loading) { return <Loading size="xlarge" /> }

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {contacts.map(contact => <ContactListItem key={contact.id} contact={contact} />)}
      </tbody>
    </Table>
  )
}

ContactList.propTypes = {
  error: apolloErrorType,
  loading: PropTypes.bool.isRequired,
  contacts: PropTypes.arrayOf(contactType),
}

ContactList.defaultProps = {
  error: null,
}

export default ContactList
