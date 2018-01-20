import React from 'react'
import PropTypes from 'prop-types'
import { tagType } from 'lib/propTypes'
import { Table } from 'components'
import TagListItem from './TagListItem'

const TagList = ({ tags }) => (
  <Table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Nombre corto</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {tags.map(tag => <TagListItem key={tag.id} tag={tag} />)}
    </tbody>
  </Table>
)

TagList.propTypes = {
  tags: PropTypes.arrayOf(tagType),
}

export default TagList
