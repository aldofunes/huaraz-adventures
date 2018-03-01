import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import i18n from 'lib/i18n'
import translations from './Nav.i18n.yaml'
import styles from './Nav.scss'

const Nav = ({ localeCode, setLocale }) => {
  i18n.extend(translations[localeCode])

  return (
    <nav className={styles.menu}>
      <NavLink exact className={styles.link} activeClassName={styles.active} to="/">
        {i18n.t('nav.home')}
      </NavLink>
      <NavLink className={styles.link} activeClassName={styles.active} to="/expeditions">
        {i18n.t('nav.expeditions')}
      </NavLink>
      <NavLink className={styles.link} activeClassName={styles.active} to="/contact">
        {i18n.t('nav.contact')}
      </NavLink>

      <div className={styles.divider} />

      <button
        onClick={() => setLocale('en')}
        className={cx(styles.link, { [styles.active]: localeCode === 'en' })}
      >
        English
      </button>

      <button
        onClick={() => setLocale('es')}
        className={cx(styles.link, { [styles.active]: localeCode === 'es' })}
      >
        Español
      </button>
    </nav>
  )
}

Nav.propTypes = {
  localeCode: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
}

export default Nav
