import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { matchType } from 'lib/propTypes'
import { Header, Button } from 'components'
import UserList from './UserList'
import NewUser from './UserList'
import EditUser from './UserList'

const Users = ({ match }) => (
  <div>
    <Header to={match.url} title="Usuarios">
      <Button to={`${match.url}/new`} icon plain>+</Button>
    </Header>

    <Switch>
      <Route exact path={match.url} component={UserList} />
      <Route path={`${match.url}/new`} component={NewUser} />
      <Route path={`${match.url}/:id`} component={EditUser} />
    </Switch>
  </div>
)

Users.propTypes = {
  match: matchType,
}

export default Users
