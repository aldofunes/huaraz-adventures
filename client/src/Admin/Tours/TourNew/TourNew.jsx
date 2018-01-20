import React from 'react'
import PropTypes from 'prop-types'
import TourForm from '../TourForm'

const EditTour = ({ createTour }) => {
  const handleSubmit = variables => createTour(variables)

  return (
    <div>
      <h2>Nuevo Tour</h2>

      <TourForm onSubmit={handleSubmit} />
    </div>
  )
}

EditTour.propTypes = {
  createTour: PropTypes.func.isRequired,
}

export default EditTour
