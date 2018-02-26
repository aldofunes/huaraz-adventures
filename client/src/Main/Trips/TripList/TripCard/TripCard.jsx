import React from 'react'
import { tripType } from 'lib/propTypes'
import { Button } from 'components/index'
import styles from './TripCard.scss'

const TripCard = ({ trip }) => (
  <div className={styles.card}>
    <img src={trip.image} alt={trip.title} className={styles.image} />
    <div className={styles.title}>
      <h3>{trip.title}</h3>
    </div>

    <div className={styles.content}>
      <h4>Expeditions:</h4>

      <ul>
        {trip.expeditions.map(expedition => <li key={expedition.id}>{expedition.name}</li>)}
      </ul>

      <Button className={styles.button} primary>Reserve</Button>
    </div>
  </div>
)

TripCard.propTypes = {
  trip: tripType,
}

export default TripCard
