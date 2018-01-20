import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './Form.scss'

const Form = ({ children, className, size = 'medium', ...props }) => (
  <form
    className={cx(className, styles.form, {
      [styles.small]: size === 'small',
      [styles.medium]: size === 'medium',
      [styles.large]: size === 'large',
      [styles.xlarge]: size === 'xlarge',
    })}
    {...props}
  >
    {children}
  </form>
)

Form.propTypes = {}

Form.defaultProps = {}

export default Form
