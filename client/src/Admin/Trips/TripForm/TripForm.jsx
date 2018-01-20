import React, { Component } from 'react'
import { arrayOf, bool, func } from 'prop-types'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import Select from 'react-select'
import { apolloErrorType, historyType, tourType, tripType } from 'lib/propTypes'
import { Button, Error, FileInput, FormField, Loading, RichEditor, TextInput } from 'components'
import styles from './TripForm.scss'

class TripForm extends Component {
  static propTypes = {
    error: apolloErrorType,
    history: historyType.isRequired,
    loading: bool.isRequired,
    onSubmit: func.isRequired,
    tours: arrayOf(tourType),
    trip: tripType,
  }

  static defaultProps = {
    trip: null,
  }

  constructor(props) {
    super(props)

    if (props.trip) {
      this.state = {
        duration: props.trip.duration,
        image: props.trip.image,
        summary: EditorState.createWithContent(convertFromRaw(JSON.parse(props.trip.summary))),
        title: props.trip.title,
        tourIds: props.trip.tours.map(({ id, name }) => ({ value: id, label: name })),
      }
    } else {
      this.state = {
        duration: '',
        image: '',
        summary: EditorState.createEmpty(),
        title: '',
        tourIds: [],
        isSavingForm: null,
        formError: null,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.trip !== this.props.trip) {
      this.setState({
        duration: nextProps.trip.duration,
        image: nextProps.trip.image,
        summary: EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.trip.summary))),
        title: nextProps.trip.title,
        tourIds: nextProps.trip.tourIds,
      })
    }
  }


  handleChangeInput = event => this.setState({ [event.target.name]: event.target.value })
  handleChangeImage = image => this.setState({ image })
  handleSummaryChange = summary => this.setState({ summary })
  handleTourIdsChange = tourIds => this.setState({ tourIds })

  handleSubmit = (event) => {
    event.preventDefault()

    const { onSubmit, history } = this.props
    const { duration, image, summary, title, tourIds } = this.state

    this.setState({ isSavingForm: true, formError: null })

    onSubmit({
      duration,
      image,
      summary: JSON.stringify(convertToRaw(summary.getCurrentContent())),
      title,
      tourIds: tourIds.map(tour => tour.value),
    })
      .then(({ data }) => {
        history.push('/admin/trips')
      })
      .catch((error) => {
        this.setState({ isSavingForm: false, formError: error })
      })
  }

  render() {
    const { error, loading, tours } = this.props
    const { duration, image, summary, title, tourIds, isSavingForm, formError } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        {isSavingForm && <Loading />}
        {formError && <Error error={formError} />}

        <FormField htmlFor="title" label="Título">
          <TextInput
            id="title"
            name="title"
            required
            type="text"
            placeholder="2 semanas en los Andes"
            value={title}
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

        <FormField htmlFor="summary" label="Resúmen">
          <RichEditor editorState={summary} onChange={this.handleSummaryChange} />
        </FormField>

        <FormField htmlFor="tourIds" label="Tours incluidos">
          {error && <Error error={error} size="small" />}
          {loading && <Loading size="small" />}
          {tours && (
            <Select
              id="tourIds"
              name="tourIds"
              multi
              value={tourIds}
              onChange={this.handleTourIdsChange}
              options={tours.map(({ id, name }) => ({ value: id, label: name }))}
            />
          )}
        </FormField>


        <Button fill primary type="submit">Enviar</Button>
      </form>
    )
  }
}

export default TripForm
