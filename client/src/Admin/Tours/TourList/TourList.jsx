import React from 'react'
import PropTypes from 'prop-types'
import { apolloErrorType, matchType, tourType } from 'lib/propTypes'
import { EmptyList, Error, Loading, Table } from 'components'
import TourListItem from './TourListItem'

const TourList = ({ error, loading, tours, match }) => {
  if (error) { return <Error error={error} size="xlarge" /> }
  if (loading) { return <Loading size="xlarge" /> }

  if (tours.length === 0) {
    return <EmptyList to={`${match.url}/new`} />
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Imagen</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {tours.map(tour => <TourListItem key={tour.id} tour={tour} />)}
      </tbody>
    </Table>
  )
}

TourList.propTypes = {
  error: apolloErrorType,
  loading: PropTypes.bool.isRequired,
  tours: PropTypes.arrayOf(tourType),
  match: matchType.isRequired,
}

TourList.defaultProps = {
  error: null,
}

export default TourList
