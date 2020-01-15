import React from 'react'
import {storiesOf} from '@storybook/react'

import List from './List'
import ListItem from '../ListItem'
import {Icon} from 'components/atoms'
import {colors} from 'styles'

storiesOf('Molecules | List', module).add('default', () => (
    <List title="Plants" icon={<Icon d={Icon.FIRE} color={colors.WHITE} size={30} />}>
        <ListItem>Anubias Nana Petite</ListItem>
        <ListItem>Eleocharis acicularis</ListItem>
        <ListItem>Anubias Coffefolia</ListItem>
        <ListItem>Rotala Hra</ListItem>
    </List>
))
