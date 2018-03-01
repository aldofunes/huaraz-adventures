import { Error, Loading, DraftConvert } from 'components/index'
import { errorType, expeditionType } from 'lib/propTypes'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Expedition.scss'

const Expedition = ({ data, localeCode }) => {
  if (data.error) { return <Error error={data.error} size="xlarge" /> }
  if (data.loading) { return <Loading size="xlarge" /> }

  const {
    altitud,
    summary,
    duration,
    itinerary,
    difficulty,
    lists,
    location,
    name,
    season,
    image,
    tags,
  } = data.expedition
  return (
    <div>
      <div style={{ backgroundImage: `url(${image})` }} className={styles.header}>
        <h1 className={styles.headerText}>{name}</h1>
      </div>

      <DraftConvert className={styles.summary} content={summary} />

      <div className={styles.container}>
        <div className={styles.content}>
          <DraftConvert className={styles.itinerary} content={itinerary} />

          {lists && lists.map(list => (
            <div className={styles.lists}>
              <h3>{list.name}</h3>
              <DraftConvert content={list.body} />
            </div>
          ))}
        </div>
        <div className={styles.side}>
          <dd>
            <dt>Altitud máxima</dt>
            <dl>{altitud}</dl>

            <dt>Duración</dt>
            <dl>{duration}</dl>

            <dt>Dificultad</dt>
            <dl>{difficulty}</dl>

            <dt>Ubicación</dt>
            <dl>{location}</dl>

            <dt>Temporada recomendada</dt>
            <dl>{season}</dl>
          </dd>
        </div>
      </div>
    </div>
  )
}

Expedition.propTypes = {
  data: PropTypes.shape({
    error: errorType,
    loading: PropTypes.bool.isRequired,
    expedition: expeditionType,
  }).isRequired,
  localeCode: PropTypes.string.isRequired,
}

export default Expedition
