import React, { Component } from 'react'
import { string, func } from 'prop-types'
import { historyType, matchType } from 'lib/propTypes'
import { Error, Loading } from 'components'
import ExpeditionForm from '../ExpeditionForm'

export default class CreateExpedition extends Component {
  static propTypes = {
    history: historyType.isRequired,
    match: matchType.isRequired,
    createExpedition: func.isRequired,
    type: string.isRequired,
  }

  state = {
    saving: false,
    formError: null,
  }

  handleSubmit = (variables) => {
    const { createExpedition, history, match } = this.props

    this.setState({ saving: true, formError: null })

    createExpedition(variables)
      .then(({ data }) => {
        if (data) {
          this.setState({ saving: false })
          history.push(match.url.replace('new', data.createExpedition.id))
        }
      })
      .catch((error) => { this.setState({ saving: false, formError: error }) })
  }

  render() {
    const { type } = this.props
    const { saving, formError } = this.state

    if (formError) { return <Error error={formError} /> }
    if (saving) { return <Loading pad="xlarge" /> }

    return <ExpeditionForm onSubmit={this.handleSubmit} type={type} />
  }
}
