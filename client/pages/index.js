import * as React from 'react'
import Link from 'next/link'
import routes from '../routes'

const Index = () => (
	<React.Fragment>
		<h1>Home page</h1>
		<Link href={routes.signUp}>
			<a>Sign Up</a>
		</Link>
	</React.Fragment>
)

export default Index