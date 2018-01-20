import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import { matchType, tourType } from 'lib/propTypes'
import { Button } from 'components'
import styles from './TourListItem.scss'

const TourListItem = ({ tour, match, deleteTour }) => {
  const handleDelete = () => {
    if (confirm('¿Estás seguro?')) {
      deleteTour({ id: tour.id })
        .then(() => { alert(`Se eliminó el tour '${tour.name}'`) })
        .catch(error => { console.error(error) })
    }
  }

  return (
    <tr>
      <td><Link to={`${match.url}/${tour.id}`}>{tour.name}</Link></td>
      <td><img className={styles.image} src={tour.image} alt={tour.name} /></td>
      <td className={styles.actions}>
        <Button plain onClick={handleDelete} icon={<FontAwesomeIcon icon={faTimes} />} />
      </td>
    </tr>
  )
}

TourListItem.propTypes = {
  tour: tourType,
  match: matchType,
  deleteTour: PropTypes.func.isRequired,
}

export default TourListItem
