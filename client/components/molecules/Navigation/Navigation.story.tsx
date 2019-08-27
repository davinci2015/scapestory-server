import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Navigation from './Navigation'

storiesOf('Navigation', module)
  .add('default', () => (
    <Navigation
      // @ts-ignore
      router={{
        asPath: ''
      }}
      isAuthenticated={false}
      userImage="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
      openModal={action("Button click")}
    />
  ))