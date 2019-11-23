import {User} from 'graphql/generated/types'
import slugify from 'slugify'

export const getUserName = (user: Pick<User, 'name' | 'username'> | null) =>
    user ? user.name || user.username : 'Unknown user'

export const getAquascapeDetailsSlug = (title: string) =>
    slugify(title, {
        lower: true,
    })
