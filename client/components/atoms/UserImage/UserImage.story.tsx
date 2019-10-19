import React from 'react'
import {storiesOf} from '@storybook/react'

import UserImage from './UserImage'
import mock from 'mocks/storybook'

storiesOf('Atoms | UserImage', module)
  .add('default', () => <UserImage image={mock.userImage} />)
  .add('size large', () => <UserImage image={mock.userImage} size="large" />)
  .add('with border', () => (
    <div style={{
      width: 50,
      height: 50,
      backgroundColor: 'gray'
    }}>
      <UserImage image={mock.userImage} size="large" variant="border" />
    </div>
  ))