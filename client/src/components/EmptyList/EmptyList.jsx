import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Button } from 'components/index'
import styles from './EmptyList.scss'

const EmptyList = ({ to, onClick, className, ...props }) => (
  <div className={cx(styles.empty, className)} {...props}>
    <h1>Esta lista está vacía</h1>
    <Button primary to={to} onClick={onClick}>Crea tu primer ítem</Button>
  </div>
)

EmptyList.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

EmptyList.defaultProps = {
  className: null,
  to: null,
  onClick: null,
}

export default EmptyList
