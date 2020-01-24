import React from 'react'
import {ApolloClient, ApolloLink} from 'apollo-boost'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {withApollo} from 'next-with-apollo'
import {createUploadLink} from 'apollo-upload-client'
import {onError} from 'apollo-link-error'

import cookie from 'services/cookie'
import appConstants from 'appConstants'
import logger from 'services/logger'
import {toast} from 'react-toastify'
import {FormattedMessage, Paragraph} from 'components/atoms'
import {errorMaper} from 'utils/mappers'
import {colors} from 'styles'

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

    const link = onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({message}) => {
                const intlMessage = errorMaper[message]
                if (intlMessage) {
                    toast.error(
                        <Paragraph color={colors.WHITE}>
                            <FormattedMessage {...intlMessage} />
                        </Paragraph>
                    )
                }
            })
        }

        if (networkError) logger.error(`[Network error]: ${networkError}`)
    })

    const httpLink = createUploadLink({
        uri: process.env.API_URL || 'http://localhost:8080', // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch: !process.browser ? fetch : undefined,
    })

    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.from([link, headersMiddleware, httpLink]),
        cache: new InMemoryCache().restore(initialState || {}),
    })
})
