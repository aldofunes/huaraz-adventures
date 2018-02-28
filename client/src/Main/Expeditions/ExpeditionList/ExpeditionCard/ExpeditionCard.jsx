import { Link } from 'react-router-dom'
import { DraftConvert } from 'components'
import { expeditionType } from 'lib/propTypes'
import React from 'react'
import styles from './ExpeditionCard.scss'

const ExpeditionCard = ({ expedition }) => (
  <Link to={`/expeditions/${expedition.id}`} className={styles.card}>
    <div
      className={styles.title}
      style={{ backgroundImage: `url(${expedition.image})` }}
    >
      <h3 className={styles.titleText}>{expedition.name}</h3>
    </div>

    <div className={styles.content}>
      <DraftConvert content={expedition.summary} />
    </div>
  </Link>
)

ExpeditionCard.propTypes = {
  expedition: expeditionType,
}

export default ExpeditionCard
