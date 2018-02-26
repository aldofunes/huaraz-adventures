import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import i18n from 'lib/i18n'
import { Menu } from 'components/index'
import translations from './Nav.i18n.yaml'
import styles from './Nav.scss'

const Nav = ({ locale, localeSet }) => {
  i18n.extend(translations[locale.code])

  return (
    <Menu className={styles.menu}>
      <NavLink exact className={styles.link} activeClassName={styles.active} to="/">
        {i18n.t('nav.home')}
      </NavLink>
      <NavLink exact className={styles.link} activeClassName={styles.active} to="/expeditions">
        {i18n.t('nav.expeditions')}
      </NavLink>
      <NavLink exact className={styles.link} activeClassName={styles.active} to="/contact">
        {i18n.t('nav.contact')}
      </NavLink>

      <div className={styles.divider} />

      <button
        onClick={() => localeSet('en')}
        className={cx(styles.link, { [styles.active]: locale.code === 'en' })}
      >
        English
      </button>

      <button
        onClick={() => localeSet('es')}
        className={cx(styles.link, { [styles.active]: locale.code === 'es' })}
      >
        Español
      </button>
    </Menu>
  )
}

Nav.propTypes = {
  locale: PropTypes.shape({
    code: PropTypes.string.isRequired,
  }),
  localeSet: PropTypes.func,
}

export default Nav
