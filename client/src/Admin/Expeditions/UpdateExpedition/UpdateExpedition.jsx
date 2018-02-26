import React, { Component } from 'react'
import { bool, func, shape, string } from 'prop-types'
import { errorType } from 'lib/propTypes'
import { Error, Loading } from 'components'
import ExpeditionForm from '../ExpeditionForm'

export default class UpdateExpedition extends Component {
  static propTypes = {
    error: errorType,
    loading: bool.isRequired,
    updateExpedition: func.isRequired,
    expedition: shape({
      id: string,
    }),
  }

  static defaultProps = {
    error: null,
    expedition: null,
  }

  state = {
    saving: false,
    formError: null,
  }

  handleSubmit = (variables) => {
    const { updateExpedition } = this.props

    this.setState({ saving: true, formError: null })

    updateExpedition(variables)
      .then(({ data }) => {
        if (data) { this.setState({ saving: false }) }
      })
      .catch((error) => { this.setState({ saving: false, formError: error }) })
  }

  render() {
    const { error, loading, expedition } = this.props
    const { saving, formError } = this.state

    if (error) { return <Error error={error} /> }
    if (formError) { return <Error error={formError} /> }
    if (loading || saving) { return <Loading pad="xlarge" /> }

    return <ExpeditionForm onSubmit={this.handleSubmit} expedition={expedition} />
  }
}
