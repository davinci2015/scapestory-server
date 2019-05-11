import * as React from 'react'
import Link from 'next/link'
import routes from '../routes'
import withData from '../lib/apollo'
import Users from '../components/Users'

const Login = () => (
    <React.Fragment>
        <h1>Login page</h1>
        <Users/>
        <Link href={routes.index}>Home</Link>
    </React.Fragment>
)

export default withData(Login)