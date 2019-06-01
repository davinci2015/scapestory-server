import React from 'react'
import {ApolloClient, NormalizedCacheObject} from 'apollo-boost'
import App, {Container} from 'next/app'
import {ApolloProvider} from 'react-apollo'
import withApolloClient from 'lib/withApolloClient'

interface Props {
    apolloClient: ApolloClient<NormalizedCacheObject>
}

class MyApp extends App<Props>  {
    render() {
        const {Component, pageProps, apolloClient} = this.props

        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </Container>
        )
    }
}

export default withApolloClient(MyApp)