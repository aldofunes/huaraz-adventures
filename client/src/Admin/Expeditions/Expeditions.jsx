import { faList, faPlus } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Button, Header } from 'components'
import { matchType } from 'lib/propTypes'
import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import ExpeditionNew from './CreateExpedition'
import ExpeditionList from './ExpeditionList'
import EditExpedition from './UpdateExpedition'

const Expeditions = ({ match }) => (
  <div>
    <Header title="Expeditions">
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
