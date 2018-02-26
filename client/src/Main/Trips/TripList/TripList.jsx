import React from 'react'
import PropTypes from 'prop-types'
import { errorType, localeType, tripType } from 'lib/propTypes'
import { Error, Loading } from 'components/index'
import i18n from 'lib/i18n'
import translations from './TripList.i18n.yaml'
import styles from './TripList.scss'
import TripCard from './TripCard/index'

const TripList = ({ error, loading, trips, locale }) => {
  if (error) { return <Error error={error} size="xlarge" /> }
  if (loading) { return <Loading size="xlarge" /> }

  i18n.extend(translations[locale.code])

  return (
    <div className={styles.container}>
      <h2>{i18n.t('tripList.title')}</h2>

      <div className={styles.grid}>
        {trips.map(trip => <TripCard key={trip.id} trip={trip} />)}
      </div>
    </div>
  )
}

TripList.propTypes = {
  error: errorType,
  loading: PropTypes.bool.isRequired,
  trips: PropTypes.arrayOf(tripType),
  locale: localeType,
}

export default TripList
