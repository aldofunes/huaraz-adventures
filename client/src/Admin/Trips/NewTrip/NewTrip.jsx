import React from 'react'
import PropTypes from 'prop-types'
import TripForm from '../TripForm'

const EditTrip = ({ createTrip }) => {
  const handleSubmit = variables => createTrip(variables)

  return (
    <div>
      <h2>Nuevo Viaje</h2>

      <TripForm onSubmit={handleSubmit} />
    </div>
  )
}

EditTrip.propTypes = {
  createTrip: PropTypes.func.isRequired,
}

export default EditTrip
