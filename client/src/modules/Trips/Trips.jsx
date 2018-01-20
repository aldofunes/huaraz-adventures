import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { matchType } from 'lib/propTypes'

const Trips = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={() => <div>TripList</div>} />
    <Route path={`${match.url}/:id`} component={() => <div>TripDetails</div>}  />
  </Switch>
)

Trips.propTypes = {
  match: matchType,
}

export default Trips
