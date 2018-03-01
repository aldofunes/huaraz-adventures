import { Button, FormField, TextInput } from 'components'
import Error from 'components/Error/Error'
import Modal from 'components/Modal/Modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import zxcvbn from 'zxcvbn'
import styles from './ChangePassword.scss'

class ChangePassword extends Component {
  static propTypes = {
    changePassword: PropTypes.func.isRequired,
  }

  state = {
    newPassword: '',
    password: '',
    verificationPassword: '',
    score: 0,
    error: null,
  }

  clearError = () => this.setState({ error: null })

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleNewPasswordChange = (event) => {
    const newPassword = event.target.value
    this.setState({ newPassword, score: zxcvbn(newPassword).score })
  }

  handleVerificationPasswordChange = (event) => {
    this.setState({ verificationPassword: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { changePassword, userId } = this.props
    const { newPassword, password, verificationPassword, score } = this.state

    if (score < 3) { return null }

    return changePassword({ id: userId, newPassword, password, verificationPassword })
      .then(() => this.setState({
        newPassword: '',
        password: '',
        verificationPassword: '',
        score: 0,
      }))
      .catch(error => this.setState({ error }))
  }

  render() {
    const { newPassword, password, verificationPassword, score, error } = this.state

    return (
      <form onSubmit={this.handleSubmit}>

        {error && (
          <Modal onClose={this.clearError}>
            <Error error={error} />
          </Modal>
        )}
        <FormField htmlFor="password" label="Contraseña anterior">
          <TextInput
            id="password"
            name="password"
            required
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </FormField>

        <FormField htmlFor="newPassword" label="Nueva contraseña">
          <TextInput
            id="newPassword"
            name="newPassword"
            required
            type="password"
            value={newPassword}
            onChange={this.handleNewPasswordChange}
          />
        </FormField>

        <meter className={styles.score} value={score} max={4} min={0} />

        <FormField htmlFor="verificationPassword" label="Verifica la nueva contraseña">
          <TextInput
            id="verificationPassword"
            name="verificationPassword"
            required
            type="password"
            value={verificationPassword}
            onChange={this.handleVerificationPasswordChange}
          />
        </FormField>

        <Button
          disabled={(score < 3) || (newPassword !== verificationPassword)}
          fill
          primary
          type="submit"
        >
          Enviar
        </Button>
      </form>
    )
  }
}

export default ChangePassword
