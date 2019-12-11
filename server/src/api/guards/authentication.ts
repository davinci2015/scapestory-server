import {ModuleContext} from '@graphql-modules/core'
import {AuthenticationError} from 'apollo-server'

export const authenticate = (next: (root, args, context, info) => void) =>
    (root, args, context: ModuleContext, info) => {
        if (!context.currentUserId) {
            throw new AuthenticationError('Unauthorized')
        }

        return next(root, args, context, info)
    }