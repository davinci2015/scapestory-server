import {ModuleContext} from '@graphql-modules/core'
import {AuthenticationError} from 'apollo-server'

export const isAuthenticated = (next: Function) => (root, args, context: ModuleContext, info) => {
    if (!context.currentUser) {
        throw new AuthenticationError('Unauthorized')
    }

    return next(root, args, context, info)
}