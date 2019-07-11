import {IncomingMessage} from 'http'
import {ApolloClient, HttpLink, InMemoryCache, ApolloLink, concat, NormalizedCacheObject} from 'apollo-boost'
import fetch from 'isomorphic-unfetch'

import appConstants from 'appConstants'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

export interface InitApolloOptions {
    getToken: (req?: IncomingMessage) => string | void
}

function create(initialState: {[key: string]: any}, options: InitApolloOptions) {
    const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                [appConstants.HEADER_AUTH_TOKEN]: options.getToken() || ''
            }
        })

        if (forward) return forward(operation)

        return null
    })

    const httpLink = new HttpLink({
        uri: 'http://localhost:8080', // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch: !process.browser ? fetch : undefined
    })

    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: concat(authMiddleware, httpLink),
        cache: new InMemoryCache().restore(initialState || {})
    })
}

export default function initApollo(initialState: {[key: string]: any}, options: InitApolloOptions) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState, options)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options)
    }

    return apolloClient
}


