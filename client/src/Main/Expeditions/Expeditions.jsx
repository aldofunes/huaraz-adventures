import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { matchType } from 'lib/propTypes'
import ExpeditionList from './ExpeditionList'
import Expedition from './Expedition'

const Expeditions = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={ExpeditionList} />
    <Route path={`${match.url}/:id`} component={Expedition} />
  </Switch>
)

Expeditions.propTypes = {
  match: matchType,
}

export default Expeditions
