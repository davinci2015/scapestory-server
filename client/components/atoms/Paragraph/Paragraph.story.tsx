import React from 'react'
import {storiesOf} from '@storybook/react'

import Paragraph from './Paragraph'

storiesOf('Atoms | Paragraph', module)
  .add('default', () => <Paragraph>Lorem ipsum</Paragraph>)
  .add('t1', () => <Paragraph type="t1">Lorem ipsum</Paragraph>)
  .add('s1', () => <Paragraph type="s1">Lorem ipsum</Paragraph>)
  .add('s2', () => <Paragraph type="s2">Lorem ipsum</Paragraph>)
  .add('body', () => <Paragraph type="body">Lorem ipsum</Paragraph>)
  .add('bold', () => <Paragraph weight="bold">Lorem ipsum</Paragraph>)
  .add('semibold', () => <Paragraph weight="semibold">Lorem ipsum</Paragraph>)