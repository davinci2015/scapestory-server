import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import mock from 'mocks/storybook'
import Gallery from './Gallery'

storiesOf('Molecules | Gallery', module).add('default', () => (
    <Gallery isOpen onClose={action('onClose')}>
        <Gallery.Image src={mock.aquascapeImage} />
        <Gallery.Image src={mock.aquascapeImage} />
        <Gallery.Image src={mock.aquascapeImage} />
    </Gallery>
))
