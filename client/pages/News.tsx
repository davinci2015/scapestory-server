import * as React from 'react'

import {Navigation} from 'components/molecules'
import {App} from 'components/core'
import withAuth from 'hocs/withAuth'

const News = () => (
    <App>
        <Navigation/>
        <h1>News page</h1>
    </App>
) 

export default withAuth(News)