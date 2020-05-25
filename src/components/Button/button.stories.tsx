import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'

const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
  <div>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </div>
)

const buttonWithType = () => (
  <>
    <Button type="primary"> primary button </Button>
    <Button type="danger"> danger button </Button>
    <Button type="link" href="https://google.com"> link button </Button>
  </>
)

storiesOf('Button component', module)
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  // .add('不同类型的 Button', buttonWithType)