import {FileUpload} from 'graphql-upload'
import {Injectable, Inject} from 'graphql-modules'

import {User} from 'db/models/User'
import {UserRepositoryInterface, UserRepository} from 'db/repositories/User'
import {uploadStreamFile, deleteFile, imageUploadOptions} from 'services/cloudinary'
import {UserDetails, ImageUploadResult} from 'interfaces/graphql/types'
import logger from 'logger'
import {
    EmailConfirmationRepositoryInterface,
    EmailConfirmationRepository,
} from 'db/repositories/EmailConfirmation'
import {AuthHelper, EmailConfirmationPayload} from 'utils/AuthHelper'

export interface UsersProviderInterface {
    getAllUsers: () => Promise<User[]>
    uploadProfileImage: (userId: number, file: Promise<FileUpload>) => Promise<ImageUploadResult>
    uploadCoverImage: (userId: number, file: Promise<FileUpload>) => Promise<ImageUploadResult>
    findUserById: (id: number) => Promise<User | null>
    updateUserDetails: (userId: number, userDetails: UserDetails) => Promise<[number, User[]]>
    findUserBySlug: (slug: string) => Promise<User | null>
    confirmEmail: (token: string) => Promise<[boolean, string?]>
    findUserByEmail(email: string): Promise<User | null>
}

@Injectable()
export class UsersProvider implements UsersProviderInterface {
    constructor(
        @Inject(UserRepository)
        private userRepository: UserRepositoryInterface,
        @Inject(EmailConfirmationRepository)
        private emailConfirmationRepository: EmailConfirmationRepositoryInterface
    ) {}

    findUserById(id: number) {
        return this.userRepository.findUserById(id)
    }

    findUserBySlug(slug: string) {
        return this.userRepository.findUserBySlug(slug)
    }

    findUserByEmail(email: string) {
        return this.userRepository.findUserByEmail(email)
    }

    getAllUsers() {
        return this.userRepository.findAll()
    }

    updateUserDetails(userId: number, userDetails: UserDetails) {
        return this.userRepository.updateUserDetails(userId, userDetails)
    }

    async confirmEmail(token: string) {
        const payload = AuthHelper.decodeJWTToken<EmailConfirmationPayload>(token)

        if (!payload) {
            return [false, undefined] as [boolean, undefined]
        }

        const confirmed = await this.emailConfirmationRepository.confirmEmail(
            payload.email,
            payload.code
        )

        if (!confirmed) {
            return [false, undefined] as [boolean, undefined]
        }

        await this.userRepository.update({emailConfirmed: true}, {where: {email: payload.email}})

        return [confirmed, payload.email] as [boolean, string]
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
