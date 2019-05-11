import * as React from 'react'
import withData from '../lib/apollo'
import SignUpForm from '../components/SignUpForm/SignUpForm'
import Layout from '../components/Layout/Layout'

const Login = () => (
    <Layout>
        <SignUpForm/>
    </Layout>
)

export default withData(Login)