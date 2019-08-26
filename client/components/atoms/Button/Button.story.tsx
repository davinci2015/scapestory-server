import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from './Button'
import {Icon} from 'components/atoms'
import {colors} from 'styles'

storiesOf('Button', module)
  .add('primary', () => <Button>Button</Button>)
  .add('secondary', () => <Button color="secondary">Button</Button>)
  .add('outlined', () => <Button variant="outlined">Button</Button>)
  .add('small', () => <Button type="small">Button</Button>)
  .add('block', () => <Button type="block">Button</Button>)
  .add('with left icon', () => <Button leftIcon={<Icon d={Icon.SHARE} color={colors.WHITE} />}>Button</Button>)
