import React, { Component } from 'react'
import cx from 'classnames'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'
import { Button } from 'components'
import styles from './Menu.scss'

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = { open: false }
  }

  componentDidUpdate() {
    if (this.state.open) { this.menu.focus() }
  }

  handleKeyPress = (event) => {
    if (event.keyCode === 27) { this.closeMenu() }
  }

  openMenu = () => { this.setState({ open: true }) }
  closeMenu = () => { this.setState({ open: false }) }

  render() {
    const { width, children, className, ...props } = this.props
    const { open } = this.state

    if (width <= 720) {
      if (open) {
        return (
          <nav
            tabIndex={0}
            onKeyDown={this.handleKeyPress}
            ref={(menu) => { this.menu = menu }}
            onBlur={this.closeMenu}
            onClick={this.closeMenu}
            className={cx(className, styles.responsive)}
            {...props}
          >
            {children}
          </nav>
        )
      }

      return (
        <Button
          className={cx(className, styles.button)}
          plain
          icon={<FontAwesomeIcon icon={faBars} />}
          onClick={this.openMenu}
        />
      )
    }

    return (
      <nav className={cx(className, styles.menu)} {...props}>
        {children}
      </nav>
    )
  }
}

export default Menu
