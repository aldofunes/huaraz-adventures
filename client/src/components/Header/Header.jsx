import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './Header.scss'

const Header = ({ children, className, to, title, ...props }) => (
  <div className={cx(styles.container, className)} {...props}>
    <h3 className={styles.title}>
      {to ? <Link to={to}>{title}</Link> : title}
    </h3>
    {children}
  </div>
)

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  className: PropTypes.string,
}

Header.defaultProps = {
  children: null,
  className: null,
  to: null,
}

export default Header
