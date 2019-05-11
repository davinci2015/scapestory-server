import * as React from 'react'
import withData from '../lib/apollo'
import RegistrationForm from '../components/RegistrationForm'
import Layout from '../components/Layout'

const Login = () => (
    <Layout>
        <h1>Sign up</h1>
        <RegistrationForm/>
    </Layout>
)

export default withData(Login)