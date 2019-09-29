import gql from 'graphql-tag'
import * as React from 'react'
import {Mutation, MutationResult} from 'react-apollo'
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login'

import config from 'config'
import logger from 'services/logger'

const LOGIN = gql`
    mutation Login($token: String!) {
        googleRegister(token: $token) {
            token
        }
    }
`

export interface GoogleProps {
    onClick(): void
}

interface Variables {
    token: string
}

interface Props {
    children: (props: GoogleProps) => React.ReactElement
    onSuccess: (token: string) => void
}

interface Data {
    googleRegister: {
        token: string
    }
}

const Login = ({children, onSuccess}: Props) => {
    const responseGoogle = (login: (props: { variables: Variables }) => Promise<void | MutationResult<Data>>) =>
        async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
            if ('code' in response) {
                return logger.warn(`Failed to login with Google with status ${response.code}`)
            }

            const token = response.getAuthResponse().access_token
            const res = await login({variables: {token}})

            if (res && res.data) {
                onSuccess(res.data.googleRegister.token)
            }
        }

    const onFailure = (error: any) => {
        logger.warn('Failed to login with Google')
        logger.warn(error)
    }

    return (
        <Mutation<Data, Variables> mutation={LOGIN}>
            {(login) => (
                <GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    // @ts-ignore
                    onSuccess={responseGoogle(login)}
                    onFailure={onFailure}
                    render={(props?: GoogleProps) => children({
                        ...props,
                        onClick: props ? props.onClick : () => null
                    })}
                />
            )}
        </Mutation>
    )
}

export default Login