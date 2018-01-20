import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faTimes } from '@fortawesome/fontawesome-free-solid'
import { tagType } from 'lib/propTypes'
import { Button, Error, Loading, TextInput } from 'components'
import styles from './TagListItem.scss'

class TagListItem extends Component {
  static propTypes = {
    tag: tagType,
    deleteTag: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      error: null,
      saving: false,
      editing: false,
      name: props.tag.name,
      slug: props.tag.slug,
    }
  }


  componentWillReceiveProps(nextProps) {
    const { tag } = this.props

    if (nextProps.tag !== tag) {
      this.setState({
        name: nextProps.tag.name,
        slug: nextProps.tag.slug,
      })
    }
  }


  handleDelete = () => {
    const { tag, deleteTag } = this.props

    if (confirm('¿Estás seguro?')) {
      deleteTag({ id: tag.id })
        .then(() => { alert(`Se eliminó el tag '${tag.name}'`) })
        .catch(error => { console.error(error) })
    }
  }

  startEditing = () => { this.setState({ editing: true }) }

  handleSubmit = (event) => {
    event.preventDefault()
    const { updateTag, tag } = this.props
    const { name, slug } = this.state

    this.setState({ saving: true })

    updateTag({ id: tag.id, name, slug })
      .then(({ data }) => {
        if (data) { this.setState({ editing: false, saving: false }) }
      })
      .catch(error => this.setState({ error, saving: false }))
  }

  handleInputChange = ({ target }) => { this.setState({ [target.name]: target.value }) }

  render() {
    const { editing, name, slug, error, saving } = this.state

    if (editing) {
      if (saving) { return <Loading /> }
      if (error) { return <Error error={error} /> }

      return (
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <div className={styles.cell}>
            <TextInput
              id="name"
              name="name"
              onChange={this.handleInputChange}
              type="text"
              value={name}
            />
          </div>

          <div className={styles.cell}>
            <TextInput
              id="slug"
              name="slug"
              type="text"
              value={slug}
              onChange={this.handleInputChange}
            />
          </div>

          <div className={styles.editActions}>
            <Button plain type="submit" icon={<FontAwesomeIcon icon={faSave} />} />
            <Button plain onClick={this.handleDelete} icon={<FontAwesomeIcon icon={faTimes} />} />
          </div>
        </form>
      )
    }

    return (
      <tr onDoubleClick={this.startEditing}>
        <td>{name}</td>
        <td>{slug}</td>
        <td className={styles.actions}>
          <Button plain onClick={this.startEditing} icon={<FontAwesomeIcon icon={faEdit} />} />
          <Button plain onClick={this.handleDelete} icon={<FontAwesomeIcon icon={faTimes} />} />
        </td>
      </tr>
    )
  }
}

export default TagListItem
