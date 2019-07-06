import * as React from 'react'
import Link from 'next/link'

import routes from 'routes'
import {Navigation} from 'components/molecules'
import {App} from 'components/core'

const Index = () => (
    <App>
        <Navigation/>
        <h1>Home page</h1>
        <Link href={routes.signUp}>
            <a>Sign Up</a>
        </Link>
    </App>
)

export default Index