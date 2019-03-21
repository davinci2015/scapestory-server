import {Injectable} from '@graphql-modules/di'

const users = [{
    _id: 0,
    username: 'Sample User'
}]

export interface UsersProviderInterface {
    getUser: (id: number) => Object,
    allUsers: () => Array<Object>
}

@Injectable()
export class UsersProvider implements UsersProviderInterface {
    getUser(id: number) {
        return users.find(({_id}) => _id === id)
    }

    allUsers() {
        return users
    }
}