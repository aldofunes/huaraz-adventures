import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import { matchType } from 'lib/propTypes'
import styles from './Sidebar.scss'

const Sidebar = ({ match, className }) => (
  <div className={cx(styles.sidebar, className)}>
    <nav>
      <NavLink exact activeClassName={styles.active} to="/">Sitio</NavLink>
      <NavLink activeClassName={styles.active} to={`${match.url}/contacts`}>Contactos</NavLink>
      <NavLink activeClassName={styles.active} to={`${match.url}/tags`}>Etiquetas</NavLink>
      <NavLink activeClassName={styles.active} to={`${match.url}/expeditions`}>Expediciones</NavLink>
      <NavLink activeClassName={styles.active} to={`${match.url}/users`}>Usuarios</NavLink>
    </nav>
  </div>
)

Sidebar.propTypes = {
  match: matchType.isRequired,
  className: PropTypes.string,
}

Sidebar.defaultProps = {
  className: '',
}

export default Sidebar
