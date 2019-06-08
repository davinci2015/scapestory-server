import * as React from 'react'
import Link from 'next/link'

import routes from 'routes'
import Layout from 'components/molecules/Layout'
import Button from 'components/atoms/Button'
import {FacebookProps} from 'components/molecules/FacebookLogin/FacebookLogin'
import FacebookLogin from 'components/molecules/FacebookLogin'
import GoogleLogin from 'components/molecules/GoogleLogin'
import {GoogleProps} from 'components/molecules/GoogleLogin/GoogleLogin'

const SignUp = () => (
    <Layout>
        <FacebookLogin>
            {
                (props: FacebookProps) =>
                    <Button onClick={props.onClick}>
                        FB Login
                    </Button>
            }
        </FacebookLogin>
        <GoogleLogin>
            {
                (props: GoogleProps) =>
                    <Button onClick={props.onClick}>
                        Google Login
                    </Button>
            }
        </GoogleLogin>
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