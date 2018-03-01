import { Error, Loading } from 'components/index'
import { errorType } from 'lib/propTypes'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

const TagList = ({ className, data }) => {
  if (data.error) { return <Error error={data.error} size="xlarge" /> }
  if (data.loading) { return <Loading size="xlarge" /> }

  return (
    <div className={className}>
      <h3>Etiquetas</h3>

      <ul>
        {data.tags.map(tag => <li key={tag.id}><Link to={`/tags/${tag.id}`}>{tag.name}</Link></li>)}
      </ul>
    </div>
  )
}

TagList.propTypes = {
  data: PropTypes.shape({
    error: errorType,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  className: PropTypes.string,
}

TagList.defaultProps = {
  className: null,
}

export default TagList
