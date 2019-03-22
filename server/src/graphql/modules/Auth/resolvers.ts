import {ModuleContext} from '@graphql-modules/core'

type LoginArgsType = {
    email: string,
    password: string
}

export const authResolvers = {
    Mutation: {
        login: (root, args: LoginArgsType, {injector}: ModuleContext) => {
        }
    }
}