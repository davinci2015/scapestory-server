import {ApolloClient, ApolloLink} from 'apollo-boost'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {withApollo} from 'next-with-apollo'
import {createUploadLink} from 'apollo-upload-client'

import cookie from 'services/cookie'
import appConstants from 'appConstants'

export default withApollo(({headers, initialState}) => {
    const headersMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                [appConstants.HEADER_AUTH_TOKEN]: cookie.getAuthToken(headers),
                [appConstants.HEADER_VISITOR_ID]: cookie.getVisitorId(headers),
            },
        })

        if (forward) return forward(operation)
        return null
    })

    const httpLink = createUploadLink({
        uri: process.env.API_URL || 'http://localhost:8080', // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch: !process.browser ? fetch : undefined,
    })

    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.from([headersMiddleware, httpLink]),
        cache: new InMemoryCache().restore(initialState || {}),
    })
})
