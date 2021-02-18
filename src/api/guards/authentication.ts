import {AuthenticationError} from 'apollo-server'
import errors from 'constants/errors'

export const authenticate = ({root, args, context, info}, next)  => {
    if (!context.currentUserId) {
        throw new AuthenticationError(errors.AUTHENTICATION_ERROR)
    }

    return next(root, args, context, info)
}
