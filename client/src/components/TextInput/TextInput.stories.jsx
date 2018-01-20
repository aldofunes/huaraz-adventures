import React from 'react'
import { storiesOf, action } from '@storybook/react'
import TextInput from './TextInput'

storiesOf('components/Forms/TextInput', module)
  .add('default', () => (
    <TextInput />
  ))
  .add('with placeholder', () => (
    <TextInput placeholder="Placeholder" />
  ))
  .add('with value', () => (
    <TextInput value="Value" onChange={action('onChange')} />
  ))
