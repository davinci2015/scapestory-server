import * as React from 'react'

import {Navigation} from 'components/molecules'
import {App} from 'components/core'
import withAuth from 'hocs/withAuth';

const Index = () => (
    <App>
        <Navigation/>
        <h1>Home page</h1>
    </App>
)

export default withAuth(Index)