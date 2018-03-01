import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import { matchType, userType } from 'lib/propTypes'
import { Button } from 'components'
import styles from './UserListItem.scss'

const UserListItem = ({ user, match, deleteUser }) => {
  const handleDelete = () => {
    if (confirm('¿Estás seguro?')) {
      deleteUser({ id: user.id })
        .then(() => { alert(`Se eliminó el usuario '${user.name}'`) })
        .catch((error) => { console.error(error) })
    }
  }

  return (
    <tr>
      <td>
        <img className={styles.avatar} src={user.avatar} alt="" />
      </td>
      <td>
        <Link to={`${match.url}/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.email}</td>
      <td className={styles.actions}>
        <Button plain onClick={handleDelete} icon={<FontAwesomeIcon icon={faTimes} />} />
      </td>
    </tr>
  )
}

UserListItem.propTypes = {
  user: userType,
  match: matchType,
  deleteUser: PropTypes.func.isRequired,
}

export default UserListItem
