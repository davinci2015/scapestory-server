import React from 'react'
import {storiesOf} from '@storybook/react'

import Card from './Card'

storiesOf('Card', module)
  .add('default', () => (
    <Card
      viewsCount={100}
      likesCount={200}
      tags={["Diorama", "Iwagumi", "> 50l"]}
      name="by John Snow"
      title="My awesome aquascape"
      userImage="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
      image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
    />
  ))