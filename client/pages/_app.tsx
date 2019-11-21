import React from 'react'
import {ApolloClient, NormalizedCacheObject} from 'apollo-boost'
import App from 'next/app'
import {ApolloProvider} from 'react-apollo'
import {IntlProvider} from 'react-intl'

import {GlobalStyles} from 'components/core'
import withApollo from 'lib/withApollo'

interface Props {
    apollo: ApolloClient<NormalizedCacheObject>
}

class MyApp extends App<Props> {
    render() {
        const {Component, pageProps, apollo} = this.props

        return (
            <IntlProvider locale="en">
                <GlobalStyles />
                <ApolloProvider client={apollo}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </IntlProvider>
        )
    }
}

export default withApollo(MyApp)
