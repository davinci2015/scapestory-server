import React from 'react'
import {NextContext, NextFunctionComponent} from 'next'

import auth from 'services/auth'

interface AuthContextInterface {
    isAuthenticated: boolean
}

export const AuthContext = React.createContext<AuthContextInterface>({
    isAuthenticated: false
})

interface WithAuthProps {
    isAuthenticated: boolean
}

const withAuth = <P extends Object>(WrappedComponent: NextFunctionComponent) =>
    class extends React.Component<P & WithAuthProps> {
        static async getInitialProps(ctx: NextContext) {
            const token = auth.getToken(ctx.req)
            const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx)
            
            return { ...pageProps, isAuthenticated: !!token } 
        }

        render() {
            return (
                <AuthContext.Provider value={{
                    isAuthenticated: this.props.isAuthenticated,
                }}>
                    <WrappedComponent {...this.props} />
                </AuthContext.Provider>
            )
        }
    }

export default withAuth