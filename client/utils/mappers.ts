import {User} from 'graphql/generated/types'

export const getUserName = (user: Pick<User, 'name'> | null) => (user ? user.name : 'Unknown user')
