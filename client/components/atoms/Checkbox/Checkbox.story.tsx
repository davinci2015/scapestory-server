import React from 'react'
import { storiesOf } from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Checkbox from './Checkbox'

storiesOf('Checkbox', module)
  .add('default', () => <Checkbox id="random" onChange={(checked) => action(`Checked: ${checked}`)}>Checkbox label</Checkbox>)
  .add('default checked', () => <Checkbox id="random" onChange={(checked) => action(`Checked: ${checked}`)} defaultChecked>Checkbox label</Checkbox>)