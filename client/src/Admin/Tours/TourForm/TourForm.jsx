import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js'
import { tourType } from 'lib/propTypes'
import { Button, Error, FormField, Loading, RichEditor, TextInput, FileInput } from 'components'
import styles from './TourForm.scss'

class TourForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    tour: tourType,
  }

  static defaultProps = {
    tour: null,
  }

  constructor(props) {
    super(props)

    if (props.tour) {
      this.state = {
        altitud: props.tour.altitud,
        summary: EditorState.createWithContent(convertFromRaw(JSON.parse(props.tour.summary))),
        difficulty: props.tour.difficulty,
        duration: props.tour.duration,
        image: props.tour.image,
        itinerary: EditorState.createWithContent(convertFromRaw(JSON.parse(props.tour.itinerary))),
        lists: props.tour.lists.map(({ name, body }) => ({
          name,
          body: EditorState.createWithContent(convertFromRaw(JSON.parse(body))),
        })),
        location: props.tour.location,
        name: props.tour.name,
        season: props.tour.season,
        isSavingForm: props.tour.isSavingForm,
        formError: props.tour.formError,
      }
    } else {
      this.state = {
        altitud: '',
        summary: EditorState.createEmpty(),
        difficulty: '',
        duration: '',
        image: '',
        itinerary: EditorState.createEmpty(),
        lists: [],
        location: '',
        name: '',
        season: '',
        isSavingForm: false,
        formError: null,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tour !== this.props.tour) {
      this.setState({
        altitud: nextProps.tour.altitud,
        summary: EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.tour.summary))),
        difficulty: nextProps.tour.difficulty,
        duration: nextProps.tour.duration,
        image: nextProps.tour.image,
        itinerary: EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.tour.itinerary))),
        lists: nextProps.tour.lists.map(({ name, body }) => ({
          name,
          body: EditorState.createWithContent(convertFromRaw(JSON.parse(body))),
        })),
        location: nextProps.tour.location,
        name: nextProps.tour.name,
        season: nextProps.tour.season,
        isSavingForm: nextProps.tour.isSavingForm,
        formError: nextProps.tour.formError,
      })
    }
  }


  addList = () => this.setState({
    lists: this.state.lists.concat({
      name: '',
      body: EditorState.createEmpty(),
    }),
  })

  removeList = index => this.setState({
    lists: this.state.lists.filter((v, i) => i !== index),
  })

  handleChangeInput = event => this.setState({ [event.target.name]: event.target.value })
  handleChangeImage = image => this.setState({ image })
  handleSummaryChange = summary => this.setState({ summary })
  handleItineraryChange = itinerary => this.setState({ itinerary })

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

  handleSubmit = event => {
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
    } = this.state

    console.log(image)

    this.setState({ isSavingForm: true, formError: null })

    onSubmit({
      altitud,
      summary: JSON.stringify(convertToRaw(summary.getCurrentContent())),
      difficulty,
      duration,
      image,
      itinerary: JSON.stringify(convertToRaw(itinerary.getCurrentContent())),
      lists: lists.map(({ name, body }) => ({
        name,
        body: JSON.stringify(convertToRaw(body.getCurrentContent())),
      })),
      location,
      name,
      season,
    })
      .then(({ data }) => {
        console.log('got data', data)
      })
      .catch((error) => {
        this.setState({ isSavingForm: false, formError: error })
      })
  }

  render() {
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
      isSavingForm,
      formError,
    } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        {isSavingForm && <Loading />}
        {formError && <Error error={formError} />}

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
            required
            accept="image/*"
            value={image}
            onChange={this.handleChangeImage}
          />
          <img className={styles.image} src={image} alt={name} />
        </FormField>

        <FormField htmlFor="location" label="Ubicación">
          <TextInput
            id="location"
            name="location"
            required
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
            required
            type="number"
            placeholder="1234.56"
            value={altitud}
            onChange={this.handleChangeInput}
          />
        </FormField>


        <FormField htmlFor="season" label="Temporada Recomendada">
          <TextInput
            id="season"
            name="season"
            required
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
            required
            type="text"
            placeholder="Poco difícil"
            value={difficulty}
            onChange={this.handleChangeInput}
          />
        </FormField>

        <FormField htmlFor="summary" label="Resúmen">
          <RichEditor editorState={summary} onChange={this.handleSummaryChange} />
        </FormField>

        <FormField htmlFor="duration" label="Duración">
          <TextInput
            id="duration"
            name="duration"
            required
            type="text"
            placeholder="3 días"
            value={duration}
            onChange={this.handleChangeInput}
          />
        </FormField>

        <FormField htmlFor="itinerary" label="Ininerario">
          <RichEditor editorState={itinerary} onChange={this.handleItineraryChange} />
        </FormField>

        <FormField htmlFor="lists" label="Listas">
          {lists.map((list, index) => (
            <div key={index} className={styles.list}>
              <div>
                <span className={styles.listName}>Lista {index} - </span>
                <Button onClick={this.removeList}>Quitar</Button>
              </div>

              <FormField htmlFor={`name-${index}`} label={`Nombre ${index}`}>
                <TextInput
                  id={`name-${index}`}
                  required
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

export default TourForm