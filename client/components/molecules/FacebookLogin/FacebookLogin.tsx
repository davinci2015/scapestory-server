import gql from 'graphql-tag'
import * as React from 'react'
import {Mutation} from 'react-apollo'
import {ReactFacebookFailureResponse, ReactFacebookLoginInfo} from 'react-facebook-login'
import config from 'config'
import logger from 'utils/logger'
// @ts-ignore
import {FacebookLogin} from 'react-facebook-login/dist/facebook-login-render-props'

const LOGIN = gql`
    mutation Login($token: String!) {
        fbRegister(token: $token) {
            token
        }
    }
`

export interface FacebookProps {
    onClick?(event: React.MouseEvent<HTMLDivElement>): void
}

interface Variables {
    token: string
}

interface Props {
    children: React.ReactNode
}

const Login = ({children}: Props) => {
    const responseFacebook = (login: (props: { variables: Variables }) => void) =>
        (response: ReactFacebookLoginInfo) =>
            login({variables: {token: response.accessToken}})

    const onFailure = (response: ReactFacebookFailureResponse) =>
        logger.warn(`Failed to login with FB with status ${response.status}`)

    return (
        <Mutation<{}, Variables> mutation={LOGIN}>
            {(login) => (
                <FacebookLogin
                    appId={config.FACEBOOK_APP_ID}
                    autoLoad
                    callback={responseFacebook(login)}
                    onFailure={onFailure}
                    render={children}
                />
            )}
        </Mutation>
    )
}

export default Login