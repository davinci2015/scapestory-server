import {UserInputError} from 'apollo-server'

export const validate = validationSchema => ({root, args, context, info}, next) => {
    if (!validationSchema.isValidSync(args)) {
        throw new UserInputError('Invalid data provided')
    }

    return next(root, args, context, info)
}
