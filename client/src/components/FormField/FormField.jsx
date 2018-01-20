import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './FormField.scss'

const FormField = ({ className, htmlFor, label, error, children, ...props }) => (
  <div className={cx(className, styles.container)} {...props}>
    <label className={styles.label} htmlFor={htmlFor}>{label}</label>
    {children}
  </div>
)

FormField.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.object,
  children: PropTypes.node,
}

FormField.defaultProps = {}

export default FormField
