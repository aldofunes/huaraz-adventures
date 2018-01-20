import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import cx from 'classnames'
import { matchType } from 'lib/propTypes'
import { NotFound } from 'components'
import Contacts from 'admin/Contacts'
import Tours from 'admin/Tours'
import Trips from 'admin/Trips'
import Users from 'admin/Users'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import SignIn from './SignIn'
import styles from './Admin.scss'

class Admin extends Component {
  static propTypes = {
    match: matchType.isRequired,
    isMobile: PropTypes.bool.isRequired,
    jwt: PropTypes.string,
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
          role="main"
          className={cx(styles.content, {
            [styles.mobile]: isMobile,
            [styles.showSidebar]: showSidebar,
            [styles.hideSidebar]: !showSidebar,
          })}
          onClick={showSidebar ? this.toggleSidebar : undefined}
          onKeyDown={() => {}}
        >
          <Switch>
            <Route exact path={match.url} component={Contacts} />
            <Route path={`${match.url}/contacts`} component={Contacts} />
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
