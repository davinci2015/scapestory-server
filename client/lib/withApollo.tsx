import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost'
import appConstants from 'appConstants'
import {withApollo} from 'next-with-apollo'
import auth from 'services/auth'

export default withApollo(
    ({headers, initialState}) => {
        const authMiddleware = new ApolloLink((operation, forward) => {
            operation.setContext({
                headers: {
                    [appConstants.HEADER_AUTH_TOKEN]: auth.getToken(headers)
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
            link: ApolloLink.from([authMiddleware, httpLink]),
            cache: new InMemoryCache().restore(initialState || {})
        })
    })
