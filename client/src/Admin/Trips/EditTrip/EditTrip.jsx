import React from 'react'
import PropTypes from 'prop-types'
import { apolloErrorType, tripType } from 'lib/propTypes'
import { Error, Loading } from 'components'
import TripForm from '../TripForm'

const EditTrip = ({ error, loading, trip, updateTrip }) => {
  if (error) { return <Error error={error} size="xlarge" /> }
  if (loading) { return <Loading size="xlarge" /> }

  const handleSubmit = variables => updateTrip(variables)

  return (
    <div>
      <h2>Editar <small>{trip.name}</small></h2>

      <TripForm trip={trip} onSubmit={handleSubmit} />
    </div>
  )
}

EditTrip.propTypes = {
  error: apolloErrorType,
  loading: PropTypes.bool.isRequired,
  updateTrip: PropTypes.func.isRequired,
  trip: tripType,
}

export default EditTrip
