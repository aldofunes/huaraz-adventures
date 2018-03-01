import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Button.scss'

const Button = ({
  children,
  className,
  href,
  icon,
  onClick,
  plain,
  primary,
  to,
  type,
  fill,
  ...props
}) => {
  const cn = classNames(className, styles.button, {
    [styles.primary]: primary,
    [styles.plain]: plain,
    [styles.icon]: icon,
    [styles.fill]: fill,
  })

  return (
    <button type={type} onClick={onClick} className={cn} {...props}>
      {icon} {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  onClick: PropTypes.func,
  fill: PropTypes.bool,
  plain: PropTypes.bool,
  primary: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

Button.defaultProps = {
  type: 'button',
}

export default Button
