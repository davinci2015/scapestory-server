import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Gallery from './Gallery'

storiesOf('Molecules | Gallery', module).add('default', () => (
    <Gallery isOpen onClose={action('onClose')}>
        <h1>hello</h1>
    </Gallery>
))
