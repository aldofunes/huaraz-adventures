import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import { contactType, matchType } from 'lib/propTypes'
import { Button } from 'components'

class ContactListItem extends Component {
  static propTypes = {
    contact: contactType,
    match: matchType,
    deleteContact: PropTypes.func.isRequired,
  }

  handleDelete = () => {
    const { deleteContact, contact: { id } } = this.props

    deleteContact({ id })
      .then(() => { console.log(`Successfully deleted ${id}`) })
      .catch(error => { console.error(error) })
  }

  render() {
    const { contact, match } = this.props

    return (
      <tr>
        <td><Link to={`${match.url}/${contact.id}`}>{contact.name}</Link></td>
        <td>{contact.email}</td>
        <td>{contact.company}</td>
        <td><Button plain onClick={this.handleDelete} icon={<FontAwesomeIcon icon={faTimes} />} /></td>
      </tr>
    )
  }
}

export default ContactListItem
