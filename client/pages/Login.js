import * as React from 'react'
import Link from 'next/link'
import routes from '../routes'

const Login = () => (
	<React.Fragment>
		<h1>Login page</h1>
		<Link href={routes.index}>Home</Link>
	</React.Fragment>
)

export default Login