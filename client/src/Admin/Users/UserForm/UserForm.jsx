import { Button, FormField, TextInput } from 'components'
import { userType } from 'lib/propTypes'
import { func } from 'prop-types'
import React, { Component } from 'react'

class UserForm extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    user: userType,
  }

  static defaultProps = {
    user: null,
  }

  constructor(props) {
    super(props)

    if (props.user) {
      const { name, email, isEnabled } = props.user

      this.state = { name, email, isEnabled }
    } else {
      this.state = { name: '', email: '', isEnabled: false }
    }
  }

  componentWillReceiveProps({ user }) {
    if (user !== this.props.user) {
      const { name, email, isEnabled } = user

      this.setState({ name, email, isEnabled })
    }
  }

  handleInputChange = event => this.setState({ [event.target.name]: event.target.value })
  handleCheckboxChange = event => this.setState({ isEnabled: event.target.checked })

  handleSubmit = (event) => {
    event.preventDefault()

    const { onSubmit } = this.props
    const { name, email, isEnabled } = this.state

    onSubmit({ name, email, isEnabled })
  }

  render() {
    const { name, email, isEnabled } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <FormField htmlFor="name" label="Nombre">
          <TextInput
            id="name"
            name="name"
            required
            type="text"
            placeholder="Eduardo Velasco"
            value={name}
            onChange={this.handleInputChange}
          />
        </FormField>

        <FormField htmlFor="email" label="Correo Electrónico">
          <TextInput
            id="email"
            name="email"
            required
            type="email"
            placeholder="eduardo.velasco@ejemplo.com"
            value={email}
            onChange={this.handleInputChange}
          />
        </FormField>

        <FormField htmlFor="isEnabled" label="Habilitado">
          <input
            id="isEnabled"
            name="isEnabled"
            type="checkbox"
            checked={isEnabled}
            onChange={this.handleCheckboxChange}
          />
        </FormField>

        <Button fill primary type="submit">Guardar</Button>
      </form>
    )
  }
}

export default UserForm
