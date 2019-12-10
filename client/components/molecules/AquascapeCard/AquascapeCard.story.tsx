import React from 'react'
import {storiesOf} from '@storybook/react'

import AquascapeCard from './AquascapeCard'

storiesOf('Molecules | AquascapeCard', module).add('default', () => (
    <div style={{maxWidth: 420}}>
        <AquascapeCard
            id={1}
            viewsCount={100}
            likesCount={200}
            tags={[{name: 'Diorama'}]}
            name="by John Snow"
            title="My awesome aquascape"
            userImage="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
            image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
        />
    </div>
))
