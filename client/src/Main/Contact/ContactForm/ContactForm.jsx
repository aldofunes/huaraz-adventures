import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState } from 'draft-js'
import { Button, Error, Form, FormField, Loading, RichEditor, TextInput } from 'components'
import i18n from 'lib/i18n'
import translations from './ContactForm.i18n.yaml'

class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    isSavingForm: false,
    savedForm: false,
    formError: null,
    editorState: EditorState.createEmpty(),
  }

  handleChangeInput = (event) => { this.setState({ [event.target.name]: event.target.value }) }

  handleEditorChange = editorState => this.setState({ editorState })

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({ isSavingForm: true, savedForm: false, formError: null })

    const { createContact } = this.props
    const { name, email, message } = this.state


    createContact({ name, email, message })
      .then(({ data }) => {
        if (data.createContact) {
          this.setState({
            name: '',
            email: '',
            message: '',
            isSavingForm: false,
            savedForm: true,
          })
        }
      })
      .catch((error) => {
        this.setState({ isSavingForm: false, formError: error })
      })
  }

  render() {
    const { locale } = this.props
    const { name, email, message, isSavingForm, savedForm, formError, editorState } = this.state
    i18n.extend(translations[locale.code])

    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const isValid = name && emailRegEx.test(email)

    return (
      <Form size="medium" onSubmit={this.handleSubmit}>
        <div align="center">
          <h1>{i18n.t('contact_get_in_touch')}</h1>
          {isSavingForm && <Loading />}
          {savedForm && <h2>Saved</h2>}
          {formError && <Error error={formError} />}
        </div>
        <div>
          <FormField
            htmlFor="name"
            label={i18n.t('contact_name')}
            error={!name || name.length >= 2 ? null : i18n.t('contact_name_invalid')}
          >
            <TextInput
              id="name"
              name="name"
              required
              type="text"
              placeholder={i18n.t('contact_name_placeholder')}
              value={name}
              onChange={this.handleChangeInput}
            />
          </FormField>
          <FormField
            htmlFor="email"
            label={i18n.t('contact_email')}
            error={!email || emailRegEx.test(email) ? null : i18n.t('contact_email_invalid')}
          >
            <TextInput
              id="email"
              name="email"
              required
              type="email"
              placeholder={i18n.t('contact_email_placeholder')}
              value={email}
              onChange={this.handleChangeInput}
            />
          </FormField>
          <FormField label={i18n.t('contact_message')}>
            <TextInput
              id="message"
              name="message"
              type="textArea"
              rows={5}
              placeholder={i18n.t('contact_message_placeholder')}
              value={message}
              onChange={this.handleChangeInput}
            />
          </FormField>
          <FormField label={i18n.t('contact_message')}>
            <RichEditor editorState={editorState} onChange={this.handleEditorChange} />
          </FormField>
        </div>
        <Button type="submit" fill disabled={!isValid}>{i18n.t('contact_submit')}</Button>
      </Form>
    )
  }
}

ContactForm.propTypes = {
  locale: PropTypes.shape({
    code: PropTypes.string.isRequired,
  }),
  createContact: PropTypes.func.isRequired,
}

ContactForm.defaultProps = {
  errorTranslations: null,
  translations: null,
}

export default ContactForm
