import {ModuleContext} from '@graphql-modules/core'
import {UserInputError} from 'apollo-server'
import {Schema} from 'yup'

export const validate = <T>(validationSchema: Schema<T>) => (
    next: (root, args, context, info) => void
) => {
    return (root, args, context: ModuleContext, info) => {
        if (!validationSchema.isValidSync(args)) {
            throw new UserInputError('Invalid data provided')
        }

        return next(root, args, context, info)
    }
}
