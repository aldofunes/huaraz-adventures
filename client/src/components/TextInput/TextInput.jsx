import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './TextInput.scss'

const TextInput = ({ type = 'text', className, ...props }) => {
  if (type === 'textArea') {
    return <textarea className={cx(className, styles.input)} {...props} />
  }
  return <input type={type} className={cx(className, styles.input)} {...props} />
}

TextInput.propTypes = {
  type: PropTypes.oneOf([
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'number',
    'password',
    'tel',
    'text',
    'url',
    'textArea',
  ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
}

TextInput.defaultProps = {
  type: 'text',
}

export default TextInput
