import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import { matchType, expeditionType } from 'lib/propTypes'
import { Button } from 'components'
import styles from './ExpeditionListItem.scss'

const ExpeditionListItem = ({ expedition, match, deleteExpedition }) => {
  const handleDelete = () => {
    if (confirm('¿Estás seguro?')) {
      deleteExpedition({ id: expedition.id })
        .then(() => { alert(`Se eliminó el expedition '${expedition.name}'`) })
        .catch((error) => { console.error(error) })
    }
  }

  return (
    <tr>
      <td><Link to={`${match.url}/${expedition.id}`}>{expedition.name}</Link></td>
      <td><img className={styles.image} src={expedition.image} alt={expedition.name} /></td>
      <td className={styles.actions}>
        <Button plain onClick={handleDelete} icon={<FontAwesomeIcon icon={faTimes} />} />
      </td>
    </tr>
  )
}

ExpeditionListItem.propTypes = {
  expedition: expeditionType,
  match: matchType,
  deleteExpedition: PropTypes.func.isRequired,
}

export default ExpeditionListItem
