import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Gallery from './Gallery'
import mock from 'mocks/storybook'

storiesOf('Molecules | Gallery', module).add('default', () => (
    <Gallery
        isOpen
        onClose={action('onClose')}
        images={[
            {original: mock.aquascapeImage, thumbnail: mock.aquascapeImage},
            {original: mock.aquascapeImage, thumbnail: mock.aquascapeImage},
        ]}
    />
))
