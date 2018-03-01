import cx from 'classnames'
import { NotFound } from 'components'
import { matchType } from 'lib/propTypes'
import { bool, string } from 'prop-types'
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import styles from './Admin.scss'
import Contacts from './Contacts'
import Profile from './Profile'
import Expeditions from './Expeditions'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import SignIn from './SignIn'
import Tags from './Tags'
import Users from './Users'

class Admin extends Component {
  static propTypes = {
    match: matchType.isRequired,
    isMobile: bool.isRequired,
    jwt: string,
  }

  static defaultProps = {
    jwt: null,
  }

  state = { showSidebar: false }

  componentWillReceiveProps(nextProps) {
    const { isMobile } = this.props
    const { showSidebar } = this.state

    if (showSidebar && isMobile && !nextProps.isMobile) {
      this.setState({ showSidebar: false })
    }
  }

  toggleSidebar = () => { this.setState({ showSidebar: !this.state.showSidebar }) }

  render() {
    const { match, isMobile, jwt } = this.props
    const { showSidebar } = this.state

    if (!jwt) { return <SignIn /> }

    return (
      <div className={styles.container}>
        <NavBar isMobile={isMobile} toggleSidebar={this.toggleSidebar} />

        <Transition in={!isMobile || showSidebar} timeout={300}>
          {state => <Sidebar className={styles[state]} />}
        </Transition>

        <div
          role="button"
          className={cx(styles.content, {
            [styles.mobile]: isMobile,
            [styles.showSidebar]: showSidebar,
            [styles.hideSidebar]: !showSidebar,
          })}
          onClick={showSidebar ? this.toggleSidebar : undefined}
          tabIndex={0}
        >
          <Switch>
            <Route exact path={match.url} component={Contacts} />
            <Route path={`${match.url}/contacts`} component={Contacts} />
            <Route path={`${match.url}/tags`} component={Tags} />
            <Route path={`${match.url}/expeditions`} component={Expeditions} />
            <Route path={`${match.url}/users`} component={Users} />
            <Route path={`${match.url}/profile`} component={Profile} />

            {/* Render a not found component when no route is found */}
            <Route path={`${match.url}/*`} component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Admin
