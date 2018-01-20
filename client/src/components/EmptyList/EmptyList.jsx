import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Button } from 'components/index'
import styles from './EmptyList.scss'

const EmptyList = ({ to, className, ...props }) => (
  <div className={cx(styles.empty, className)} {...props}>
    <h1>Esta lista está vacía</h1>
    <Button primary to={to}>Crea tu primer ítem</Button>
  </div>
)

EmptyList.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
}

EmptyList.defaultProps = {
  className: null,
}

export default EmptyList
