import * as React from 'react'

import {App} from 'components/core'
import withAuth from 'hocs/withAuth';
import {NavigationContainer} from 'components/organisms'

const Index = () => (
    <App>
        <NavigationContainer/>
        <h1>Home page</h1>
        <div style={{height: '200vh'}}></div>
    </App>
)

export default withAuth(Index)