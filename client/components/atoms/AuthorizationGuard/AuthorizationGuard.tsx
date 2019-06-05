import auth from 'utils/auth'
import {NextFunctionComponent, NextContext} from 'next'
import {PropsWithChildren} from 'react'

interface Props {
    isAuthorized?: boolean
}

const AuthorizationGuard: NextFunctionComponent<PropsWithChildren<Props>> = (props) => {
    console.log(props.isAuthorized)
    return <h1>{props.isAuthorized} {props.children}</h1>
}

AuthorizationGuard.getInitialProps = async ({req}: NextContext) => {
    // @ts-ignore
    console.log('heere i am')
    const token = auth.getToken(req)
    const isAuthorized = !!token

    console.log('token',token)
    return {isAuthorized}
}

export default AuthorizationGuard