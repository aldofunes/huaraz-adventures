import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'components'
import styles from './NavBar.scss'
import logo from './logo.png'

const NavBar = ({ isMobile, toggleSidebar }) => (
  <div className={styles.header}>
    <Link to="/"><img className={styles.logo} src={logo} alt="LOVIS" /></Link>

    {isMobile && <Button icon plain onClick={toggleSidebar}>☰</Button>}
  </div>
)

NavBar.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
}

export default NavBar
