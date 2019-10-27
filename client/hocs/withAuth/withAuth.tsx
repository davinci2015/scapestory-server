import React from 'react'
import {NextPageContext, NextComponentType} from 'next'

import auth from 'services/auth'
import {AuthContext} from 'context/auth'

interface WithAuthProps {
    isAuthenticated: boolean
}

const withAuth = <P extends Object>(WrappedComponent: NextComponentType) =>
    class extends React.Component<P & WithAuthProps> {
        static async getInitialProps(ctx: NextPageContext) {
            const token = auth.getToken(ctx.req)
            const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx)
            
            return { ...pageProps, isAuthenticated: !!token } 
        }

        state = {
            isAuthenticated: this.props.isAuthenticated
        }

        render() {
            return (
                <AuthContext.Provider value={{
                    isAuthenticated: this.state.isAuthenticated,
                    setIsAuthenticated: (isAuthenticated: boolean) => this.setState({isAuthenticated})
                }}>
                    <WrappedComponent {...this.props} />
                </AuthContext.Provider>
            )
        }
    }

export default withAuth