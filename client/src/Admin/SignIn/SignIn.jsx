import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, FormField, TextInput } from 'components'
import fetch from 'unfetch'
import styles from './SignIn.scss'

class SignIn extends Component {
  static propTypes = {
    setJwt: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  handleInputChange = ({ target }) => { this.setState({ [target.name]: target.value }) }

  handleSubmit = (event) => {
    event.preventDefault()

    const { setJwt } = this.props
    const { email, password } = this.state
    fetch(`${process.env.BACKEND_URL}/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(({ jwt }) => setJwt(jwt))
      .catch((error) => { console.log(error) })
  }

  render() {
    const { email, password } = this.state

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h1 className={styles.title}>Inicia sesión</h1>
          <FormField label="Correo electrónico" htmlFor="email">
            <TextInput
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={this.handleInputChange}
            />
          </FormField>
          <FormField label="Contraseña" htmlFor="password">
            <TextInput
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </FormField>

          <Button fill primary type="submit">Enviar</Button>
        </form>
      </div>
    )
  }
}

export default SignIn
