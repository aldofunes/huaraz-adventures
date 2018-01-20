import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.scss'

class Modal extends Component {
  componentDidMount() {
    // This allows us to automatically catch keyboard events
    this.modal.focus()
    document.body.classList.add(styles.noScroll)
  }

  componentWillUnmount() {
    document.body.classList.remove(styles.noScroll)
  }

  handleClose = () => {
    const { onClose } = this.props
    onClose()
  }

  // new way of autobinding a method
  handleKeyDown = (event) => {
    // keyCode 27 is the esc key
    if (event.keyCode === 27) {
      this.handleClose()
    }
  }

  render() {
    const { children, title } = this.props

    return (
      <div
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
        ref={(modal) => { this.modal = modal }}
        className={styles.overlay}
        onClick={this.handleClose}
      >
        <div
          className={styles.modal}
          // Prevent firing parent's onClick
          onClick={event => event.stopPropagation()}
        >
          <div className={styles.title}>{title}</div>
          {children}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  title: null,
}

export default Modal
