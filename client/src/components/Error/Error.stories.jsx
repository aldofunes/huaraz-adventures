import React from 'react'
import { storiesOf } from '@storybook/react'
import ErrorComponent from './Error'

const error = new Error('An error has occurred, please contact your administrator')

storiesOf('components/Error', module)
  .add('small', () => (
    <ErrorComponent size="small" error={error} />
  ))
  .add('medium', () => (
    <ErrorComponent size="medium" error={error} />
  ))
  .add('large', () => (
    <ErrorComponent size="large" error={error} />
  ))
  .add('xlarge', () => (
    <ErrorComponent size="xlarge" error={error} />
  ))
