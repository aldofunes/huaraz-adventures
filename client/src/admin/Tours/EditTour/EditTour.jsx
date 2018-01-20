import React from 'react'
import PropTypes from 'prop-types'
import { apolloErrorType, tourType } from 'lib/propTypes'
import { Error, Loading } from 'components'
import TourForm from '../TourForm'

const EditTour = ({ error, loading, tour, updateTour }) => {
  if (error) { return <Error error={error} size="xlarge" /> }
  if (loading) { return <Loading size="xlarge" /> }

  const handleSubmit = variables => updateTour(variables)

  return (
    <div>
      <h2>Editar <small>{tour.name}</small></h2>

      <TourForm tour={tour} onSubmit={handleSubmit} />
    </div>
  )
}

EditTour.propTypes = {
  error: apolloErrorType,
  loading: PropTypes.bool.isRequired,
  updateTour: PropTypes.func.isRequired,
  tour: tourType,
}

export default EditTour
