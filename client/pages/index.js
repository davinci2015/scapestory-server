import * as React from 'react'
import Link from 'next/link'
import routes from '../routes'

const Index = () => (
	<React.Fragment>
		<h1>Home page</h1>
		<Link href={routes.login}>Login page</Link>
	</React.Fragment>
)

export default Index