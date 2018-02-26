import React from 'react'
import { bool, func, string } from 'prop-types'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars, faSignOutAlt } from '@fortawesome/fontawesome-free-solid'
import { matchType } from 'lib/propTypes'
import { Button } from 'components'
import styles from './NavBar.scss'
import logo from './logo.png'

const NavBar = ({ isMobile, toggleSidebar, match, signOut, setLocale, localeCode }) => (
  <div className={styles.container}>
    <Link to={match.url}><img className={styles.logo} src={logo} alt="Huaraz Adventures" /></Link>

    <div>
      <Button
        icon
        plain
        className={cx({ [styles.active]: localeCode === 'es' })}
        onClick={() => setLocale('es')}
      >
        ES
      </Button>
      <Button
        icon
        plain
        className={cx({ [styles.active]: localeCode === 'en' })}
        onClick={() => setLocale('en')}
      >
        EN
      </Button>
    </div>

    <div className={styles.menu}>
      <Button plain icon={<FontAwesomeIcon icon={faSignOutAlt} />} onClick={signOut} />

      {isMobile &&
      <Button icon={<FontAwesomeIcon icon={faBars} />} plain onClick={toggleSidebar} />}
    </div>
  </div>
)

NavBar.propTypes = {
  isMobile: bool.isRequired,
  localeCode: string.isRequired,
  match: matchType.isRequired,
  setLocale: func.isRequired,
  signOut: func.isRequired,
  toggleSidebar: func.isRequired,
}

export default NavBar
