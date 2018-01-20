import React from 'react'
import { any, func, oneOf, string } from 'prop-types'
import cx from 'classnames'
import styles from './TextInput.scss'

const TextInput = ({ type, className, ...props }) => {
  if (type === 'textArea') {
    return <textarea className={cx(className, styles.input)} {...props} />
  }
  return <input type={type} className={cx(className, styles.input)} {...props} />
}

TextInput.propTypes = {
  type: oneOf([
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'number',
    'password',
    'tel',
    'text',
    'textArea',
    'url',
  ]),
  className: string,
  onChange: func,
  value: any, // eslint-disable-line react/forbid-prop-types
}

TextInput.defaultProps = {
  type: 'text',
}

export default TextInput
