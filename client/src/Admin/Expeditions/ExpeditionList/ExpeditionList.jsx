import React from 'react'
import PropTypes from 'prop-types'
import { errorType, matchType, expeditionType } from 'lib/propTypes'
import { EmptyList, Error, Loading, Table } from 'components'
import ExpeditionListItem from './ExpeditionListItem'

const ExpeditionList = ({ error, loading, expeditions, match }) => {
  if (error) { return <Error error={error} size="xlarge" /> }
  if (loading) { return <Loading size="xlarge" /> }

  if (expeditions.length === 0) {
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
        {expeditions.map(expedition => <ExpeditionListItem key={expedition.id} expedition={expedition} />)}
      </tbody>
    </Table>
  )
}

ExpeditionList.propTypes = {
  error: errorType,
  loading: PropTypes.bool.isRequired,
  expeditions: PropTypes.arrayOf(expeditionType),
  match: matchType.isRequired,
}

ExpeditionList.defaultProps = {
  error: null,
}

export default ExpeditionList
