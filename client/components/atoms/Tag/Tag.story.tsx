import React from 'react'
import {storiesOf} from '@storybook/react'

import Tag from './Tag'

storiesOf('Atoms | Tag', module)
  .add('primary', () => <Tag text="Tag" variant="primary"/>)
  .add('secondary', () => <Tag text="Tag" variant="secondary"/>)
  .add('tertiary', () => <Tag text="Tag" variant="tertiary"/>)
  .add('quaternary', () => <Tag text="Tag" variant="quaternary"/>)
  .add('size large', () => <Tag text="Tag" size="large"/>)