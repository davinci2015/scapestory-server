import React from 'react'
import {storiesOf} from '@storybook/react'

import UserWidget from './UserWidget'

storiesOf('UserWidget', module)
  .add('default', () => (
    <UserWidget
      text="My awesome aquascape"
      image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
    />
  ))
  .add('with border', () => (
    <UserWidget
      variant="border"
      text="My awesome aquascape"
      image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
    />
  ))
  .add('size l', () => (
    <UserWidget
      size="l"
      text="My awesome aquascape"
      image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
    />
  ))