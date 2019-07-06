import React from 'react'
import {ApolloClient, NormalizedCacheObject} from 'apollo-boost'
import App, {Container} from 'next/app'
import {ApolloProvider} from 'react-apollo'
import withApolloClient from 'lib/withApolloClient'
import {IntlProvider} from 'react-intl';
import {ModalProvider} from 'context/modal'

interface Props {
    apolloClient: ApolloClient<NormalizedCacheObject>
}

class MyApp extends App<Props>  {
    render() {
        const {Component, pageProps, apolloClient} = this.props

        return (
            <Container>
                <IntlProvider>
                    <ApolloProvider client={apolloClient}>
                        <ModalProvider>
                            <Component {...pageProps} />
                        </ModalProvider>
                    </ApolloProvider>
                </IntlProvider>
            </Container>
        )
    }
}

// @ts-ignore
export default withApolloClient(MyApp)