import {NextFunctionComponent} from 'next'
import {PropsWithChildren} from 'react'

interface Props {
    isAuthorized?: boolean
}

const AuthorizationGuard: NextFunctionComponent<PropsWithChildren<Props>> = (props) => {
    return <h1>{props.isAuthorized} {props.children}</h1>
}

AuthorizationGuard.getInitialProps = async () => {
    return {isAuthorized: true}
}

export default AuthorizationGuard