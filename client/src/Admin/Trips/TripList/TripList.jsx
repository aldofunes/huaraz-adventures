import React from 'react'
import PropTypes from 'prop-types'
import { errorType, matchType, tripType } from 'lib/propTypes'
import { EmptyList, Error, Loading, Table } from 'components'
import TripListItem from './TripListItem'

const TripList = ({ error, loading, trips, match }) => {
  if (error) { return <Error error={error} size="xlarge" /> }
  if (loading) { return <Loading size="xlarge" /> }
  if (trips.length === 0) { return <EmptyList to={`${match.url}/new`} /> }

  return (
    <Table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Imagen</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {trips.map(trip => <TripListItem key={trip.id} trip={trip} />)}
      </tbody>
    </Table>
  )
}

TripList.propTypes = {
  error: errorType,
  loading: PropTypes.bool.isRequired,
  trips: PropTypes.arrayOf(tripType),
  match: matchType.isRequired,
}

TripList.defaultProps = {
  error: null,
}

export default TripList
