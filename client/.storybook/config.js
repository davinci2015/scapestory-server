import {configure, addDecorator} from '@storybook/react'

import Layout from 'components/core/Layout'

addDecorator((story) => (
  <Layout>
    {story()}
  </Layout>
))

// automatically import all files ending in *.story.tsx
const req = require.context('../components', true, /.story.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
