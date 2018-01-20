import React from 'react'
import { Route } from 'react-router-dom'
import { matchType } from 'lib/propTypes'
import ContactList from './ContactList'

const Contacts = ({ match }) => (
  <div>
    <Route path={match.url} component={ContactList} />
  </div>
)

Contacts.propTypes = {
  match: matchType.isRequired,
}

export default Contacts
