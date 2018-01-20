import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import { matchType, tripType } from 'lib/propTypes'
import { Button } from 'components'
import styles from './TripListItem.scss'

const TripListItem = ({ trip, match, deleteTrip }) => {
  const handleDelete = () => {
    if (confirm('¿Estás seguro?')) {
      deleteTrip({ id: trip.id })
        .then(() => { alert(`Se eliminó el viaje '${trip.title}'`) })
        .catch(error => { console.error(error) })
    }
  }

  return (
    <tr>
      <td><Link to={`${match.url}/${trip.id}`}>{trip.title}</Link></td>
      <td><img className={styles.image} src={trip.image} alt={trip.title} /></td>
      <td className={styles.actions}>
        <Button plain onClick={handleDelete} icon={<FontAwesomeIcon icon={faTimes} />} />
      </td>
    </tr>
  )
}

TripListItem.propTypes = {
  trip: tripType,
  match: matchType,
  deleteTrip: PropTypes.func.isRequired,
}

export default TripListItem
