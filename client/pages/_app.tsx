import React from 'react'
import {ApolloClient, NormalizedCacheObject} from 'apollo-boost'
import App from 'next/app'
import {ApolloProvider} from 'react-apollo'
import {IntlProvider} from 'react-intl'

import withApolloClient from 'lib/withApolloClient'
import {ModalProvider} from 'providers/modal'

interface Props {
    apolloClient: ApolloClient<NormalizedCacheObject>
}

class MyApp extends App<Props>  {
    render() {
        const {Component, pageProps, apolloClient} = this.props

        return (
            <IntlProvider locale="en">
                <ApolloProvider client={apolloClient}>
                    <ModalProvider>
                        <Component {...pageProps} />
                    </ModalProvider>
                </ApolloProvider>
            </IntlProvider>
        )
    }
}

// @ts-ignore
export default withApolloClient(MyApp)