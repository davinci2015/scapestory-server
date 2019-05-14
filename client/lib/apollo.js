import {ApolloClient, HttpLink, InMemoryCache, ApolloLink, concat} from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import appConstants from '../appConstants'
import services from '../services'

let apolloClient = null

function create(initialState) {
    const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                [appConstants.HEADER_AUTH_TOKEN]: services.auth.getToken() || ''
            }
        })

        return forward(operation)
    })

    const httpLink = new HttpLink({
        uri: 'http://localhost:8080', // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        // Use fetch() polyfill on the server
        fetch: !process.browser && fetch
    })

    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: concat(authMiddleware, httpLink),
        cache: new InMemoryCache().restore(initialState || {})
    })
}

export default function initApollo(initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState)
    }

    return apolloClient
}


