import React from 'react'
import {storiesOf} from '@storybook/react'

import UserWidget, {UserWidgetSize, UserWidgetVariant} from './UserWidget'
import mock from 'mocks/storybook'

export const createUserWidget = (
    text: React.ReactNode = 'My awesome aquascape',
    size?: UserWidgetSize,
    variant?: UserWidgetVariant
) => <UserWidget text={text} image={mock.userImage} size={size} variant={variant} />

storiesOf('Molecules | UserWidget', module)
    .add('default', () => createUserWidget())
    .add('with border', () =>
        createUserWidget('My awesome aquascape', UserWidgetSize.s24, UserWidgetVariant.BORDER)
    )
    .add('size l', () => createUserWidget('My awesome aquascape', UserWidgetSize.s36))
