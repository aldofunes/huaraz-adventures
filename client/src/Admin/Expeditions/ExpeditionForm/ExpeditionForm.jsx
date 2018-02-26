import React, { Component } from 'react'
import { arrayOf, bool, func } from 'prop-types'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import Select from 'react-select'
import { errorType, expeditionType, tagType } from 'lib/propTypes'
import { Button, Error, FileInput, FormField, Loading, RichEditor, TextInput } from 'components'
import styles from './ExpeditionForm.scss'

class ExpeditionForm extends Component {
  static propTypes = {
    error: errorType,
    loading: bool.isRequired,
    onSubmit: func.isRequired,
    tags: arrayOf(tagType),
    expedition: expeditionType,
  }

  static defaultProps = {
    error: null,
    tags: null,
    expedition: null,
  }

  constructor(props) {
    super(props)

    if (props.expedition) {
      const {
        altitud,
        summary,
        difficulty,
        duration,
        image,
        itinerary,
        lists,
        location,
        name,
        season,
        tags,
      } = props.expedition

      this.state = {
        altitud,
        summary: EditorState.createWithContent(convertFromRaw(JSON.parse(summary))),
        difficulty,
        duration,
        image,
        itinerary: EditorState.createWithContent(convertFromRaw(JSON.parse(itinerary))),
        lists: lists.map(list => ({
          name: list.name,
          body: EditorState.createWithContent(convertFromRaw(JSON.parse(list.body))),
        })),
        location,
        name,
        season,
        tagIds: tags.map(tag => ({ value: tag.id, label: tag.name })),
      }
    } else {
      this.state = {
        altitud: null,
        summary: EditorState.createEmpty(),
        difficulty: '',
        duration: '',
        image: '',
        itinerary: EditorState.createEmpty(),
        lists: [],
        location: '',
        name: '',
        season: '',
        tagIds: [],
      }
    }
  }

  componentWillReceiveProps({ expedition }) {
    if (expedition !== this.props.expedition) {
      const {
        altitud,
        summary,
        difficulty,
        duration,
        image,
        itinerary,
        lists,
        location,
        name,
        season,
        tags,
      } = expedition

      this.setState({
        altitud,
        summary: EditorState.createWithContent(convertFromRaw(JSON.parse(summary))),
        difficulty,
        duration,
        image,
        itinerary: EditorState.createWithContent(convertFromRaw(JSON.parse(itinerary))),
        lists: lists.map(list => ({
          name: list.name,
          body: EditorState.createWithContent(convertFromRaw(JSON.parse(list.body))),
        })),
        location,
        name,
        season,
        tagIds: tags.map(tag => ({ value: tag.id, label: tag.name })),
      })
    }
  }

  addList = () => this.setState({
    lists: this.state.lists.concat({
      name: '',
      body: EditorState.createEmpty(),
    }),
  })

  removeList = (index) => {
    this.setState({
      lists: this.state.lists.filter((v, i) => i !== index),
    })
  }

  handleChangeInput = (event) => { this.setState({ [event.target.name]: event.target.value }) }
  handleChangeImage = (images) => { this.setState({ image: images[0] }) }
  handleSummaryChange = (summary) => { this.setState({ summary }) }
  handleItineraryChange = (itinerary) => { this.setState({ itinerary }) }
  handleTagIdsChange = (tagIds) => { this.setState({ tagIds }) }

  handleListNameChange = (event, index) => {
    const { lists } = this.state
    lists[index].name = event.target.value
    this.setState({ lists })
  }

  handleListBodyChange = (body, index) => {
    const { lists } = this.state
    lists[index].body = body
    this.setState({ lists })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { onSubmit } = this.props
    const {
      altitud,
      summary,
      difficulty,
      duration,
      image,
      itinerary,
      lists,
      location,
      name,
      season,
      tagIds,
    } = this.state

    onSubmit({
      altitud,
      summary: JSON.stringify(convertToRaw(summary.getCurrentContent())),
      difficulty,
      duration,
      image,
      itinerary: JSON.stringify(convertToRaw(itinerary.getCurrentContent())),
      lists: lists.map(list => ({
        name,
        body: JSON.stringify(convertToRaw(list.body.getCurrentContent())),
      })),
      location,
      name,
      season,
      tagIds: tagIds.map(tag => tag.value),
    })
  }

  render() {
    const { error, loading, tags } = this.props
    const {
      altitud,
      summary,
      difficulty,
      duration,
      image,
      itinerary,
      lists,
      location,
      name,
      season,
      tagIds,
    } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <FormField htmlFor="name" label="Nombre">
          <TextInput
            id="name"
            name="name"
            required
            type="text"
            placeholder="Caminata por las montañas"
            value={name}
            onChange={this.handleChangeInput}
          />
        </FormField>

        <FormField htmlFor="image" label="Imagen">
          <FileInput
            id="image"
            name="image"
            accept="image/*"
            onChange={this.handleChangeImage}
          />
          <TextInput
            id="image"
            name="image"
            type="text"
            placeholder="https://url.of.image/image.jpg"
            value={image}
            onChange={this.handleChangeInput}
          />
          <img className={styles.image} src={image} alt="Expedition Image" />
        </FormField>

        <FormField htmlFor="location" label="Ubicación">
          <TextInput
            id="location"
            name="location"
            type="text"
            placeholder="Lima, Perú"
            value={location}
            onChange={this.handleChangeInput}
          />
        </FormField>

        <FormField htmlFor="altitud" label="Altitud Máxima (msnm)">
          <TextInput
            id="altitud"
            name="altitud"
            type="number"
            placeholder="1234.56"
            value={altitud}
            onChange={this.handleChangeInput}
          />
        </FormField>

        <FormField htmlFor="tagIds" label="Etiquetas">
          {error && <Error error={error} size="small" />}
          {loading && <Loading size="small" />}
          {tags && (
            <Select
              id="tagIds"
              name="tagIds"
              multi
              value={tagIds}
              onChange={this.handleTagIdsChange}
              options={tags.map(tag => ({ value: tag.id, label: tag.name }))}
            />
          )}
        </FormField>

        <FormField htmlFor="season" label="Temporada Recomendada">
          <TextInput
            id="season"
            name="season"
            type="text"
            placeholder="Invierno"
            value={season}
            onChange={this.handleChangeInput}
          />
        </FormField>

        <FormField htmlFor="difficulty" label="Dificultad">
          <TextInput
            id="difficulty"
            name="difficulty"
            type="text"
            placeholder="Poco difícil"
            value={difficulty}
            onChange={this.handleChangeInput}
          />
        </FormField>

        <FormField htmlFor="summary" label="Resumen">
          <RichEditor editorState={summary} onChange={this.handleSummaryChange} />
        </FormField>

        <FormField htmlFor="duration" label="Duración">
          <TextInput
            id="duration"
            name="duration"
            type="text"
            placeholder="3 días"
            value={duration}
            onChange={this.handleChangeInput}
          />
        </FormField>

        <FormField htmlFor="itinerary" label="Itinerario">
          <RichEditor editorState={itinerary} onChange={this.handleItineraryChange} />
        </FormField>

        <FormField htmlFor="lists" label="Listas">
          {lists.map((list, index) => (
            <div key={index} className={styles.list}>
              <div>
                <span className={styles.listName}>Lista {index} - </span>
                <Button onClick={this.removeList.bind(this, index)}>Quitar</Button>
              </div>

              <FormField htmlFor={`name-${index}`} label="Nombre">
                <TextInput
                  id={`name-${index}`}
                  type="text"
                  placeholder="Servicios Incluidos"
                  value={list.name}
                  onChange={event => this.handleListNameChange(event, index)}
                />
              </FormField>
              <FormField htmlFor={`body-${index}`} label="Contenido">
                <RichEditor
                  editorState={list.body}
                  onChange={event => this.handleListBodyChange(event, index)}
                />
              </FormField>
            </div>
          ))}
          <Button icon onClick={this.addList}>Agregar Lista</Button>
        </FormField>

        <Button fill primary type="submit">Enviar</Button>
      </form>
    )
  }
}

export default ExpeditionForm
