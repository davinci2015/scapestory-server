import React from 'react'
import { storiesOf } from '@storybook/react'

import Headline from './Headline'

storiesOf('Headline', module)
  .add('h1', () => <Headline variant="h1">Button</Headline>)
  .add('h2', () => <Headline variant="h2">Button</Headline>)
  .add('h3', () => <Headline variant="h3">Button</Headline>)
  .add('h4', () => <Headline variant="h4">Button</Headline>)
  .add('h5', () => <Headline variant="h5">Button</Headline>)
