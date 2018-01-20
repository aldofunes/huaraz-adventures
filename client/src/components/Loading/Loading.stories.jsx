import React from 'react'
import { storiesOf } from '@storybook/react'
import Loading from './Loading'

storiesOf('components/Loading', module)
  .add('small', () => (
    <Loading size="small" />
  ))
  .add('medium', () => (
    <Loading size="medium" />
  ))
  .add('large', () => (
    <Loading size="large" />
  ))
  .add('xlarge', () => (
    <Loading size="xlarge" />
  ))
