import { Error, Loading } from 'components'
import { historyType, matchType } from 'lib/propTypes'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import UserForm from '../UserForm'

export default class CreateUser extends Component {
  static propTypes = {
    history: historyType.isRequired,
    match: matchType.isRequired,
    createUser: PropTypes.func.isRequired,
  }

  state = {
    saving: false,
    formError: null,
  }

  handleSubmit = (variables) => {
    const { createUser, history, match } = this.props

    this.setState({ saving: true, formError: null })

    createUser(variables)
      .then(({ data }) => {
        if (data) {
          this.setState({ saving: false })
          history.push(match.url.replace('new', data.createUser.id))
        }
      })
      .catch((error) => { this.setState({ saving: false, formError: error }) })
  }

  render() {
    const { saving, formError } = this.state

    if (formError) { return <Error error={formError} /> }
    if (saving) { return <Loading pad="xlarge" /> }

    return <UserForm onSubmit={this.handleSubmit} />
  }
}
