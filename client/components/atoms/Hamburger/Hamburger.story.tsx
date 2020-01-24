import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'

import Hamburger from './Hamburger'

storiesOf('Atoms | Hamburger', module).add(
    'default',
    withState({isOpen: false})(({store}) => (
        <Hamburger
            isOpen={store.state.isOpen}
            onClick={() => store.set({isOpen: !store.state.isOpen})}
        />
    ))
)
