import React from 'react'
import { arrayOf, bool, func } from 'prop-types'
import { errorType, matchType, tagType } from 'lib/propTypes'
import { Button, EmptyList, Error, Header, Loading } from 'components'
import TagList from './TagList'


const Tags = ({ error, loading, tags, match, createTag }) => {
  if (error) { return <Error error={error} size="xlarge" /> }
  if (loading) { return <Loading size="xlarge" /> }

  return (
    <div>
      <Header title="Tags">
        <Button onClick={createTag} icon plain>+</Button>
      </Header>

      {(tags.length === 0) ? <EmptyList onClick={createTag} /> : <TagList tags={tags} />}
    </div>
  )
}

Tags.propTypes = {
  match: matchType.isRequired,
  error: errorType,
  loading: bool.isRequired,
  tags: arrayOf(tagType),
  createTag: func.isRequired,
}

Tags.defaultProps = {
  error: null,
  tags: null,
}

export default Tags
