import React, { Component } from 'react'
import { bool, string } from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import cx from 'classnames'
import { matchType } from 'lib/propTypes'
import { NotFound } from 'components'
import Contacts from './Contacts'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import SignIn from './SignIn'
import Tags from './Tags'
import Tours from './Tours'
import Trips from './Trips'
import Users from './Users'
import styles from './Admin.scss'

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
            <Route path={`${match.url}/tours`} component={Tours} />
            <Route path={`${match.url}/trips`} component={Trips} />
            <Route path={`${match.url}/users`} component={Users} />

            {/* Render a not found component when no route is found */}
            <Route path={`${match.url}/*`} component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Admin
