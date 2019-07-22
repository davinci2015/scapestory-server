import gql from 'graphql-tag'
import * as React from 'react'
import {Mutation, FetchResult} from 'react-apollo'
import {ReactFacebookFailureResponse, ReactFacebookLoginInfo} from 'react-facebook-login'
import config from 'config'
import logger from 'services/logger'
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const LOGIN = gql`
    mutation Login($token: String!) {
        fbRegister(token: $token) {
            token
        }
    }
`

export interface FacebookProps {
    onClick(): void
}

interface Variables {
    token: string
}

interface Props {
    children: (props: FacebookProps) => React.ReactElement
    onSuccess: (token: string) => void
}

interface Data {
    fbRegister: {
        token: string
    }
}

const Login = ({children, onSuccess}: Props) => {
    const responseFacebook = (login: (props: { variables: Variables }) => Promise<void | FetchResult<Data>>) =>
        async (response: ReactFacebookLoginInfo) => {
            const res = await login({variables: {token: response.accessToken}})
            if (res && res.data) {
                onSuccess(res.data.fbRegister.token)
            }
        }

    const onFailure = (response: ReactFacebookFailureResponse) =>
        logger.warn(`Failed to login with FB with status ${response.status}`)

    return (
        <Mutation<Data, Variables> mutation={LOGIN}>
            {(login) => (
                <FacebookLogin
                    appId={config.FACEBOOK_APP_ID}
                    callback={responseFacebook(login)}
                    onFailure={onFailure}
                    render={children}
                />
            )}
        </Mutation>
    )
}

export default Login