import i18n from 'lib/i18n'
import ExpeditionList from 'Main/Expeditions/ExpeditionList'
import PropTypes from 'prop-types'
import React from 'react'
import translations from './Home.i18n.yaml'
import styles from './Home.scss'
import image from './mountains.svg'
import TagList from './TagList'

const Home = ({ localeCode }) => {
  i18n.extend(translations[localeCode])

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>{i18n.t('home.hero')}</h1>

        <img className={styles.image} src={image} alt={i18n.t('home.hero')} />
      </div>

      <div className={styles.content}>
        <ExpeditionList limit={10} className={styles.expeditionList} />

        <div className={styles.side}>
          <TagList />
        </div>
      </div>
    </div>
  )
}
Home.propTypes = {
  localeCode: PropTypes.string.isRequired,
}

export default Home
