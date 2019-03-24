import {ModuleContext} from '@graphql-modules/core'
import {User} from 'db/models/User'

type LoginArgsType = {
    email: string,
    password: string
}

export const authResolvers = {
    Mutation: {
        login: (root, args: LoginArgsType, {injector}: ModuleContext) => {
            User.create({
                username: 'test',
                email: 'testovski@gmail.com'
            })
                .then(() => {})
                .catch((e) => {})
        }
    }
}