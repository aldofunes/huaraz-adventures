import React from 'react'
import { node, string } from 'prop-types'
import { errorType } from 'lib/propTypes'
import cx from 'classnames'
import styles from './FormField.scss'

const FormField = ({ className, htmlFor, label, error, children, ...props }) => (
  <div className={cx(className, styles.container)} {...props}>
    <label className={styles.label} htmlFor={htmlFor}>{label}</label>
    {children}
  </div>
)

FormField.propTypes = {
  className: string,
  htmlFor: string,
  label: string,
  error: errorType,
  children: node.isRequired,
}

FormField.defaultProps = {
  className: null,
  label: null,
  htmlFor: null,
  error: null,
}

export default FormField
