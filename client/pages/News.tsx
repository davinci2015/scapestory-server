import * as React from 'react'

import {App} from 'components/core'
import withAuth from 'hocs/withAuth'
import NavigationContainer from 'containers/Navigation'

const News = () => (
    <App>
        <NavigationContainer/>
        <h1>News page</h1>
    </App>
) 

export default withAuth(News)