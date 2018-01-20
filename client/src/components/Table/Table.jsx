import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './Table.scss'

const Table = ({ children, className, ...props }) => (
  <table className={cx(styles.table, className)} {...props}>
    {children}
  </table>
)

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Table
