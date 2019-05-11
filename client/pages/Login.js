import * as React from 'react'
import withData from '../lib/apollo'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

const Login = () => (
    <Layout>
        <h1>Login page</h1>
        <LoginForm/>
    </Layout>
)

export default withData(Login)