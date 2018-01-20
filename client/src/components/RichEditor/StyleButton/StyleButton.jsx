import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './StyleButton.scss'

class StyleButton extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    style: PropTypes.string.isRequired,
  }

  handleToggle = (event) => {
    const { onToggle, style } = this.props
    event.preventDefault()

    onToggle(style)
  }

  render() {
    const { active, label } = this.props

    return (
      <span
        role="button"
        tabIndex={0}
        className={cx(styles.styleButton, { [styles.activeButton]: active })}
        onMouseDown={this.handleToggle}
      >
        {label}
      </span>
    )
  }
}

export default StyleButton
