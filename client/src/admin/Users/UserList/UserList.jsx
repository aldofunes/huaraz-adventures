import React from 'react'
import PropTypes from 'prop-types'
import { apolloErrorType, matchType, userType } from 'lib/propTypes'
import { EmptyList, Error, Loading, Table } from 'components'
import UserListItem from './UserListItem'

const UserList = ({ error, loading, users, match }) => {
  if (error) { return <Error error={error} size="xlarge" /> }
  if (loading) { return <Loading size="xlarge" /> }
  if (users.length === 0) { return <EmptyList to={`${match.url}/new`} /> }

  return (
    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo electrónico</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {users.map(user => <UserListItem key={user.id} user={user} />)}
      </tbody>
    </Table>
  )
}

UserList.propTypes = {
  error: apolloErrorType,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(userType),
  match: matchType.isRequired,
}

UserList.defaultProps = {
  error: null,
}

export default UserList
