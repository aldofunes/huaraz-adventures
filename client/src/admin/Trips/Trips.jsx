import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { matchType } from 'lib/propTypes'
import { Header, Button } from 'components'
import TripList from './TripList'
import NewTrip from './NewTrip'
import EditTrip from './EditTrip'

const Trips = ({ match }) => (
  <div>
    <Header to={match.url} title="Viajes">
      <Button to={`${match.url}/new`} icon plain>+</Button>
    </Header>

    <Switch>
      <Route exact path={match.url} component={TripList} />
      <Route path={`${match.url}/new`} component={NewTrip} />
      <Route path={`${match.url}/:id`} component={EditTrip} />
    </Switch>
  </div>
)

Trips.propTypes = {
  match: matchType,
}

export default Trips
