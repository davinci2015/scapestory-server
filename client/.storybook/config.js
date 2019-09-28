import {configure, addDecorator} from '@storybook/react'
import Router from 'next/router'
import {GlobalStyles} from 'components/core'

addDecorator((story) => (
  <>
    <GlobalStyles />
    {story()}
  </>
))


// Mock router
const mockedRouter = {
  push: () => {},
  prefetch: () => {},
  asPath: () => {}
}

Router.router = mockedRouter


// automatically import all files ending in *.story.tsx
const req = require.context('../components', true, /.story.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
