import React from 'react'
import {storiesOf} from '@storybook/react'

import {Icon, Paragraph} from 'components/atoms'
import {colors} from 'styles'
import Badge from './Badge'

storiesOf('Atoms | Badge', module)
    .add('default', () => (
        <Badge icon={<Icon d={Icon.FIRE} color={colors.WHITE} />}>
            <Paragraph type="body" color={colors.BLACK}>
                Editor's Choice
            </Paragraph>
        </Badge>
    ))
    .add('with text inside', () => <Badge icon="DV" />)
    .add('gradient background', () => (
        <Badge
            background="gradient"
            icon={<Icon d={Icon.FIRE} color={colors.WHITE} />}
        />
    ))
