import React from 'react'
import {storiesOf} from '@storybook/react'

import ImageStack from './ImageStack'

const image =
    'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'

storiesOf('Atoms | ImageStack', module).add('default', () => (
    <ImageStack images={Array(4).fill(image)} text="Some text" />
))
