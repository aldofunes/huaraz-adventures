import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { matchType } from 'lib/propTypes'
import { Header, Button } from 'components'
import TourList from './TourList'
import TourNew from './TourNew'
import EditTour from './EditTour'

const Tours = ({ match }) => (
  <div>
    <Header to={match.url} title="Tours">
      <Button to={`${match.url}/new`} icon plain>+</Button>
    </Header>

    <Switch>
      <Route exact path={match.url} component={TourList} />
      <Route path={`${match.url}/new`} component={TourNew} />
      <Route path={`${match.url}/:id`} component={EditTour} />
    </Switch>
  </div>
)

Tours.propTypes = {
  match: matchType.isRequired,
}

export default Tours
