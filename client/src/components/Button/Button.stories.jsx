import React from 'react'
import { storiesOf } from '@storybook/react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/fontawesome-free-solid'
import Button from './Button'

storiesOf('components/Button', module)
  .add('default', () => (
    <Button>A button</Button>
  ))
  .add('primary', () => (
    <Button primary>A button</Button>
  ))
  .add('plain', () => (
    <Button plain>A button</Button>
  ))
  .add('icon', () => (
    <Button icon={<FontAwesomeIcon icon={faBeer} />} />
  ))
  .add('plain icon', () => (
    <Button plain icon={<FontAwesomeIcon icon={faBeer} />} />
  ))
