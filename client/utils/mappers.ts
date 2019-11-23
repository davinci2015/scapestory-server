import {User} from 'graphql/generated/types'

export const getUserName = (user: Pick<User, 'name' | 'username'> | null) =>
    user ? user.name || user.username : 'Unknown user'
