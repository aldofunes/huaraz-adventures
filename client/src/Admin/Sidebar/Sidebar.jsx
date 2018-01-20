import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import { matchType } from 'lib/propTypes'
import styles from './Sidebar.scss'

const Sidebar = ({ match, className, signOut, localeCode, setLocale }) => {
  const handleLocaleChange = event => setLocale(event.target.value)

  return (
    <div className={cx(styles.sidebar, className)}>
      <nav>
        <NavLink exact activeClassName={styles.active} to={match.url}>Inicio</NavLink>
        <NavLink activeClassName={styles.active} to={`${match.url}/contacts`}>Contactos</NavLink>
        <NavLink activeClassName={styles.active} to={`${match.url}/tags`}>Etiquetas</NavLink>
        <NavLink activeClassName={styles.active} to={`${match.url}/tours`}>Tours</NavLink>
        <NavLink activeClassName={styles.active} to={`${match.url}/trips`}>Viajes</NavLink>
        <NavLink activeClassName={styles.active} to={`${match.url}/users`}>Usuarios</NavLink>
      </nav>

      <footer className={styles.footer}>
        <select value={localeCode} onChange={handleLocaleChange}>
          <option value="es">Español</option>
          <option value="en">Inglés</option>
        </select>

        <a role="button" tabIndex={0} onClick={signOut}>Cerrar Sesión</a>
      </footer>
    </div>
  )
}

Sidebar.propTypes = {
  match: matchType.isRequired,
  className: PropTypes.string,
  signOut: PropTypes.func.isRequired,
  localeCode: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
}

Sidebar.defaultProps = {
  className: '',
}

export default Sidebar
