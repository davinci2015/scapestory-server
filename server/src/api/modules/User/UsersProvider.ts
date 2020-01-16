import Bluebird from 'bluebird'
import {FileUpload} from 'graphql-upload'

import {Injectable, Inject} from '@graphql-modules/di'
import {tokens} from 'di/tokens'
import {UserRepositoryInterface} from 'db/repositories/User'
import {User} from 'db/models/User'
import {uploadStreamFile} from 'services/cloudinary'

export interface UsersProviderInterface {
    findUserById: (id: number) => Promise<User | null>
    findUserBySlug: (slug: string) => Promise<User | null>
    getAllUsers: () => Bluebird<User[]>
    uploadProfileImage: (userId: number, file: Promise<FileUpload>) => Promise<[number, User[]]>
    uploadCoverImage: (userId: number, file: Promise<FileUpload>) => Promise<[number, User[]]>
}

@Injectable()
export class UsersProvider implements UsersProviderInterface {
    constructor(
        @Inject(tokens.USER_REPOSITORY)
        private userRepository: UserRepositoryInterface
    ) {}

    findUserById(id: number) {
        return this.userRepository.findUserById(id)
    }

    findUserBySlug(slug: string) {
        return this.userRepository.findUserBySlug(slug)
    }

    getAllUsers() {
        return this.userRepository.findAll()
    }

    async uploadProfileImage(userId: number, file: Promise<FileUpload>) {
        const {createReadStream, filename} = await file
        const result = await uploadStreamFile(createReadStream, filename)

        return this.userRepository.updateProfileImage(userId, result.public_id, result.secure_url)
    }

    async uploadCoverImage(userId: number, file: Promise<FileUpload>) {
        const {createReadStream, filename} = await file
        const result = await uploadStreamFile(createReadStream, filename)

        return this.userRepository.updateCoverImage(userId, result.public_id, result.secure_url)
    }
}
