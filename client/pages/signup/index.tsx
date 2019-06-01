import * as React from 'react'
import Link from 'next/link'
import routes from 'routes'
import Layout from 'components/molecules/Layout'
import Button from 'components/atoms/Button'
import {FacebookProps} from 'components/molecules/FacebookLogin/FacebookLogin'
import FacebookLogin from 'components/molecules/FacebookLogin'

const SignUp = () => (
    <Layout>
        <FacebookLogin>
            {((renderProps: FacebookProps) => <Button onClick={renderProps.onClick}>This is my custom FB button</Button>)}
        </FacebookLogin>
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