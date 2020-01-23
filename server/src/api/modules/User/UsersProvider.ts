import Bluebird from 'bluebird'
import {FileUpload} from 'graphql-upload'
import {Injectable, Inject, ProviderScope} from '@graphql-modules/di'

import {tokens} from 'di/tokens'
import {User} from 'db/models/User'
import {UserRepositoryInterface} from 'db/repositories/User'
import {uploadStreamFile, deleteFile, imageUploadOptions} from 'services/cloudinary'
import {UserDetails, ImageUploadResult} from 'interfaces/graphql/types'
import logger from 'logger'
import {EmailConfirmationRepositoryInterface} from 'db/repositories/EmailConfirmation'

export interface UsersProviderInterface {
    findUserById: (id: number) => Promise<User | null>
    findUserBySlug: (slug: string) => Promise<User | null>
    getAllUsers: () => Bluebird<User[]>
    uploadProfileImage: (userId: number, file: Promise<FileUpload>) => Promise<ImageUploadResult>
    uploadCoverImage: (userId: number, file: Promise<FileUpload>) => Promise<ImageUploadResult>
    updateUserDetails: (userId: number, userDetails: UserDetails) => Promise<[number, User[]]>
    confirmEmail: (email: string, key: string) => Promise<boolean>
}

@Injectable({scope: ProviderScope.Session})
export class UsersProvider implements UsersProviderInterface {
    constructor(
        @Inject(tokens.USER_REPOSITORY)
        private userRepository: UserRepositoryInterface,
        @Inject(tokens.EMAIL_CONFIRMATION_REPOSITORY)
        private emailConfirmationRepository: EmailConfirmationRepositoryInterface
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

    async confirmEmail(email: string, key: string) {
        const confirmed = await this.emailConfirmationRepository.confirmEmail(email, key)

        if (confirmed) {
            await this.userRepository.update({emailConfirmed: true}, {where: {email}})
        }

        return confirmed
    }

    async uploadProfileImage(userId: number, file: Promise<FileUpload>) {
        const {createReadStream} = await file
        const user = await this.userRepository.findUserById(userId)
        const result = await uploadStreamFile(createReadStream, imageUploadOptions.userProfileImage)

        if (user?.profileImagePublicId) {
            deleteFile(user.profileImagePublicId).catch(error => logger.error(error))
        }

        await this.userRepository.updateProfileImage(userId, result.public_id, result.secure_url)

        return {imageUrl: result.secure_url, imagePublicId: result.public_id}
    }

    async uploadCoverImage(userId: number, file: Promise<FileUpload>) {
        const {createReadStream} = await file
        const user = await this.userRepository.findUserById(userId)
        const result = await uploadStreamFile(createReadStream, imageUploadOptions.userCoverImage)

        if (user?.coverImagePublicId) {
            deleteFile(user.coverImagePublicId).catch(error => logger.error(error))
        }

        await this.userRepository.updateCoverImage(userId, result.public_id, result.secure_url)

        return {imageUrl: result.secure_url, imagePublicId: result.public_id}
    }
}
