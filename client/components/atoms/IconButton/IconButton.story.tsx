import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import IconButton from './IconButton'

storiesOf('IconButton', module)
  .add('default', () => <IconButton onClick={() => action('Icon click')}>Some icon</IconButton>)