import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Header.scss'

const Header = ({ children, className, title, ...props }) => (
  <div className={cx(styles.container, className)} {...props}>
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
)

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Header.defaultProps = {
  children: null,
  className: null,
}

export default Header
