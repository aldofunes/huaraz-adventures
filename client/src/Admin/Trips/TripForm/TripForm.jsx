import React, { Component } from 'react'
import { arrayOf, bool, func } from 'prop-types'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import Select from 'react-select'
import { errorType, historyType, expeditionType, tripType } from 'lib/propTypes'
import { Button, Error, FileInput, FormField, Loading, RichEditor, TextInput } from 'components'
import styles from './TripForm.scss'

class TripForm extends Component {
  static propTypes = {
    error: errorType,
    history: historyType.isRequired,
    loading: bool.isRequired,
    onSubmit: func.isRequired,
    expeditions: arrayOf(expeditionType),
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
        expeditionIds: props.trip.expeditions.map(({ id, name }) => ({ value: id, label: name })),
      }
    } else {
      this.state = {
        duration: '',
        image: '',
        summary: EditorState.createEmpty(),
        title: '',
        expeditionIds: [],
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
        expeditionIds: nextProps.trip.expeditionIds,
      })
    }
  }


  handleChangeInput = event => this.setState({ [event.target.name]: event.target.value })
  handleChangeImage = image => this.setState({ image })
  handleSummaryChange = summary => this.setState({ summary })
  handleExpeditionIdsChange = expeditionIds => this.setState({ expeditionIds })

  handleSubmit = (event) => {
    event.preventDefault()

    const { onSubmit, history } = this.props
    const { duration, image, summary, title, expeditionIds } = this.state

    this.setState({ isSavingForm: true, formError: null })

    onSubmit({
      duration,
      image,
      summary: JSON.stringify(convertToRaw(summary.getCurrentContent())),
      title,
      expeditionIds: expeditionIds.map(expedition => expedition.value),
    })
      .then(({ data }) => {
        history.push('/admin/trips')
      })
      .catch((error) => {
        this.setState({ isSavingForm: false, formError: error })
      })
  }

  render() {
    const { error, loading, expeditions } = this.props
    const { duration, image, summary, title, expeditionIds, isSavingForm, formError } = this.state

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

        <FormField htmlFor="summary" label="Resumen">
          <RichEditor editorState={summary} onChange={this.handleSummaryChange} />
        </FormField>

        <FormField htmlFor="expeditionIds" label="Expeditions incluidos">
          {error && <Error error={error} size="small" />}
          {loading && <Loading size="small" />}
          {expeditions && (
            <Select
              id="expeditionIds"
              name="expeditionIds"
              multi
              value={expeditionIds}
              onChange={this.handleExpeditionIdsChange}
              options={expeditions.map(({ id, name }) => ({ value: id, label: name }))}
            />
          )}
        </FormField>


        <Button fill primary type="submit">Enviar</Button>
      </form>
    )
  }
}

export default TripForm
