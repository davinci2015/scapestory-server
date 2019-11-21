import React from 'react'
import {NextPageContext, NextComponentType} from 'next'

import cookie from 'services/cookie'
import AuthenticationProvider from 'providers/AuthenticationProvider'

interface WithAuthProps {
    isAuthenticated: boolean
}

const withAuth = <P extends Object>(WrappedComponent: NextComponentType) =>
    class extends React.Component<P & WithAuthProps> {
        static async getInitialProps(ctx: NextPageContext) {
            const headers = ctx.req && ctx.req.headers
            const token = cookie.getAuthToken(headers)
            const pageProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx))

            return {...pageProps, isAuthenticated: !!token}
        }

        render() {
            return (
                <AuthenticationProvider
                    initialIsAuthenticated={this.props.isAuthenticated}
                >
                    <WrappedComponent {...this.props} />
                </AuthenticationProvider>
            )
        }
    }

export default withAuth
