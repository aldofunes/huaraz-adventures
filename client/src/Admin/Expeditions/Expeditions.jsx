import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faList, faPlus } from '@fortawesome/fontawesome-free-solid'
import { matchType } from 'lib/propTypes'
import { Button, Header } from 'components'
import ExpeditionList from './ExpeditionList'
import ExpeditionNew from './CreateExpedition'
import EditExpedition from './UpdateExpedition'

const Expeditions = ({ match }) => (
  <div>
    <Header to={match.url} title="Expeditions">
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
      <Route exact path={match.url} component={ExpeditionList} />
      <Route path={`${match.url}/new`} component={ExpeditionNew} />
      <Route path={`${match.url}/:id`} component={EditExpedition} />
    </Switch>
  </div>
)

Expeditions.propTypes = {
  match: matchType.isRequired,
}

export default Expeditions
