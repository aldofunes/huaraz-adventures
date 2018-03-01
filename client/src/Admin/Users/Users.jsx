import { faList, faPlus } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Button, Header } from 'components'
import { matchType } from 'lib/propTypes'
import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import UserList from './UserList'

const Users = ({ match }) => (
  <div>
    <Header title="Usuarios">
      <div>
        <Link to={`${match.url}/new`}>
          <Button plain icon={<FontAwesomeIcon icon={faPlus} />} />
        </Link>
        <Link to={match.url}>
          <Button plain icon={<FontAwesomeIcon icon={faList} />} />
        </Link>
      </div>
    </Header>

    <Switch>
      <Route exact path={match.url} component={UserList} />
      <Route path={`${match.url}/new`} component={CreateUser} />
      <Route path={`${match.url}/:id`} component={UpdateUser} />
    </Switch>
  </div>
)

Users.propTypes = {
  match: matchType,
}

export default Users
