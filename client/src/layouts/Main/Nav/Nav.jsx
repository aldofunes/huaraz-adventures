import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import i18n from 'lib/i18n'
import { Menu } from 'components'
import translations from './Nav.i18n.yaml'
import styles from './Nav.scss'

const Nav = ({ locale, localeSet }) => {
  i18n.extend(translations[locale.code])

  return (
    <Menu className={styles.menu}>
      <NavLink exact className={styles.link} activeClassName={styles.active} to="/">
        {i18n.t('nav.home')}
      </NavLink>
      <NavLink exact className={styles.link} activeClassName={styles.active} to="/trips">
        {i18n.t('nav.trips')}
      </NavLink>

      <div className={styles.divider} />

      <a
        onClick={() => localeSet('en')}
        className={cx(styles.link, { [styles.active]: locale.code === 'en' })}
      >
        English
      </a>

      <a
        onClick={() => localeSet('es')}
        className={cx(styles.link, { [styles.active]: locale.code === 'es' })}
      >
        Español
      </a>
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
