import {IncomingMessage} from 'http'
import {onError} from 'apollo-link-error'
import {ApolloClient, HttpLink, InMemoryCache, ApolloLink, NormalizedCacheObject} from 'apollo-boost'
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

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
      
        if (networkError) console.log(`[Network error]: ${networkError}`);
      })

    const httpLink = new HttpLink({
        uri: 'http://localhost:8080', // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch: !process.browser ? fetch : undefined
    })

    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.from([
            authMiddleware,
            errorLink,
            httpLink,
        ]),
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


