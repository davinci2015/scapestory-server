import * as React from 'react'
import Link from 'next/link'
import routes from '../../routes'
import Layout from '../../components/Layout'

const SignUp = () => (
    <Layout>
        <h3>Sign up with Facebook</h3>
        <h3>Sign up with Google</h3>
        <Link href={routes.signUpEmail}>
            <a>
                <h3>Sign up with Email</h3>
            </a>
        </Link>
        <p>
            Already have an account? <Link href={routes.login}><a>Log in</a></Link>
        </p>
    </Layout>
)

export default SignUp