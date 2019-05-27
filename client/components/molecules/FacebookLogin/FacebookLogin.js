import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import appConfig from 'appConfig'
import * as React from 'react'

const Login = ({ children }) => {
    const responseFacebook = (response) => {
        console.log(response);
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