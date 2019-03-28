import {ModuleContext} from '@graphql-modules/core'

export const authenticated = (next: Function) => (root, args, context: ModuleContext, info) => {
    if (!context.currentUser) {
        throw new Error('Unauthenticated')
    }

    return next(root, args, context, info)
}