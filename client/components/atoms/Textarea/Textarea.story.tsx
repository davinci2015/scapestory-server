import React from 'react'
import {storiesOf} from '@storybook/react'

import Textarea from './Textarea'

storiesOf('Textarea', module)
  .add('default', () => <Textarea placeholder='Enter your message' />)