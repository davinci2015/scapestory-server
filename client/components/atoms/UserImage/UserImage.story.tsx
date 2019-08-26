import React from 'react'
import {storiesOf} from '@storybook/react'

import UserImage from './UserImage'

const image = 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'

storiesOf('UserImage', module)
  .add('default', () => <UserImage image={image} />)
  .add('size l', () => <UserImage image={image} size="l" />)
  .add('with border', () => (
    <div style={{
      width: 50,
      height: 50,
      backgroundColor: 'gray'
    }}>
      <UserImage image={image} size="l" variant="border" />
    </div>
  ))