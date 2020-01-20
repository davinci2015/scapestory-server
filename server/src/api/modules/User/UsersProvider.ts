import Bluebird from 'bluebird'
import {FileUpload} from 'graphql-upload'

import {Injectable, Inject} from '@graphql-modules/di'
import {tokens} from 'di/tokens'
import {UserRepositoryInterface} from 'db/repositories/User'
import {User} from 'db/models/User'
import {uploadStreamFile, deleteFile} from 'services/cloudinary'
import {UserDetails, ImageUploadResult} from 'interfaces/graphql/types'

export interface UsersProviderInterface {
    findUserById: (id: number) => Promise<User | null>
    findUserBySlug: (slug: string) => Promise<User | null>
    getAllUsers: () => Bluebird<User[]>
    uploadProfileImage: (userId: number, file: Promise<FileUpload>) => Promise<ImageUploadResult>
    uploadCoverImage: (userId: number, file: Promise<FileUpload>) => Promise<ImageUploadResult>
    updateUserDetails: (userId: number, userDetails: UserDetails) => Promise<[number, User[]]>
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

    updateUserDetails(userId: number, userDetails: UserDetails) {
        return this.userRepository.updateUserDetails(userId, userDetails)
    }

    async uploadProfileImage(userId: number, file: Promise<FileUpload>) {
        const {createReadStream, filename} = await file
        const result = await uploadStreamFile(createReadStream, filename)
        const user = await this.userRepository.findUserById(userId)

        if (user?.coverImagePublicId) {
            deleteFile(user.coverImagePublicId)
        }

        await this.userRepository.updateProfileImage(userId, result.public_id, result.secure_url)

        return {imageUrl: result.secure_url, imagePublicId: result.public_id}
    }

    async uploadCoverImage(userId: number, file: Promise<FileUpload>) {
        const {createReadStream, filename} = await file
        const result = await uploadStreamFile(createReadStream, filename)
        const user = await this.userRepository.findUserById(userId)

        if (user?.coverImagePublicId) {
            deleteFile(user.coverImagePublicId)
        }

        await this.userRepository.updateCoverImage(userId, result.public_id, result.secure_url)

        return {imageUrl: result.secure_url, imagePublicId: result.public_id}
    }
}
