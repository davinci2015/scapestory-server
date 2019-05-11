import * as React from 'react'
import Link from 'next/link'
import routes from '../routes'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'

const Index = () => (
    <Layout>
        <Navigation/>
        <h1>News page</h1>
        <Link href={routes.signUp}>
            <a>Sign Up</a>
        </Link>
        <br/>
        <Link href={routes.login}>
            <a>Login</a>
        </Link>
    </Layout>
)

export default Index