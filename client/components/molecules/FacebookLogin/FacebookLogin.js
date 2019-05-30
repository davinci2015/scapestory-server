import * as React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import appConfig from 'appConfig'

const Login = ({ children, login }) => {
    const responseFacebook = (response) => {
        login({variables: {token: response.accessToken}})
    }

    return (
        <FacebookLogin
            appId={appConfig.FACEBOOK_APP_ID}
            autoLoad
            callback={responseFacebook}
            render={children}
        />
    )
}

export default Login