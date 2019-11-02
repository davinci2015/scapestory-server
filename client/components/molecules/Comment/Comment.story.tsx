import React from 'react'
import {storiesOf} from '@storybook/react'

import Comment from './Comment'
import mock from 'mocks/storybook'

storiesOf('Molecules | Comment', module)
  .add('default', () => (
    <Comment
      id={1}
      onLike={() => null}
      username={mock.username}
      userImage={mock.userImage}
      content="If I could give you all the applause I would for your perfect rebuttal to a tedious trend of attention grabbing  shallow and uniformed articles by pseudo design talent."
      createdAt={Date.now().toString()}
    />
  ))