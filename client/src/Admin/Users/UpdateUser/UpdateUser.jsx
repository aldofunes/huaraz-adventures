import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { errorType } from 'lib/propTypes'
import { Error, Loading } from 'components'
import UserForm from '../UserForm'

export default class UpdateUser extends Component {
  static propTypes = {
    data: PropTypes.shape({
      error: errorType,
      loading: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    updateUser: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  state = {
    saving: false,
    formError: null,
  }

  handleSubmit = (variables) => {
    const { updateUser } = this.props

    this.setState({ saving: true, formError: null })

    updateUser(variables)
      .then(({ data }) => {
        if (data) { this.setState({ saving: false }) }
      })
      .catch((error) => { this.setState({ saving: false, formError: error }) })
  }

  render() {
    const { data } = this.props
    const { saving, formError } = this.state

    if (data.error) { return <Error error={data.error} /> }
    if (formError) { return <Error error={formError} /> }
    if (data.loading || saving) { return <Loading pad="xlarge" /> }

    return <UserForm onSubmit={this.handleSubmit} user={data.user} />
  }
}
