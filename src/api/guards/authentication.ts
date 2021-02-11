import {ModuleContext} from '@graphql-modules/core'
import {AuthenticationError} from 'apollo-server'
import errors from 'constants/errors'

export const authenticate = (next: (root, args, context, info) => void) => (
    root,
    args,
    context: ModuleContext,
    info
) => {
    console.log('---authenticate', context.currentUserId)
    if (!context.currentUserId) {
        throw new AuthenticationError(errors.AUTHENTICATION_ERROR)
    }

    return next(root, args, context, info)
}
