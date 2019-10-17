import React from 'react'
import {storiesOf} from '@storybook/react'

import List from './List'
import {Icon} from 'components/atoms'
import {colors} from 'styles'

storiesOf('Molecules | List', module)
  .add('default', () => (
    <List
      title="Plants"
      icon={<Icon d={Icon.FIRE} color={colors.WHITE} size={30}/>}
    >
      <List.Item>Anubias Nana Petite</List.Item>
      <List.Item>Eleocharis acicularis</List.Item>
      <List.Item>Anubias Coffefolia</List.Item>
      <List.Item>Rotala H'ra</List.Item>
    </List>
  ))