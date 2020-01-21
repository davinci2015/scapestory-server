/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import environment from 'config/environment'
import cloudinary = require('cloudinary')
import {UploadApiOptions, TransformationOptions} from 'cloudinary'

type ImageTypes = 'userProfileImage' | 'userCoverImage' | 'aquascapeImage'

type ImageTransformations = {
    [key in ImageTypes]: TransformationOptions
}

type Folders = {
    [key in ImageTypes]: string
}

export const folders: Folders = {
    userProfileImage: 'profile_images',
    userCoverImage: 'cover_images',
    aquascapeImage: 'aquascapes',
}

export const imageTransformations: ImageTransformations = {
    userProfileImage: {
        width: 142,
        height: 142,
        crop: 'fill',
    },
    userCoverImage: {
        width: 1366,
        height: 270,
        crop: 'fill',
    },
    aquascapeImage: {},
}

export interface CloudinaryUploadResult {
    public_id: string
    version: number
    signature: string
    width: number
    height: number
    format: string
    resource_type: string
    created_at: string
    bytes: number
    type: string
    url: string
    secure_url: string
}

cloudinary.v2.config({
    api_key: environment.CLOUDINARY_API_KEY,
    api_secret: environment.CLOUDINARY_API_SECRET,
    cloud_name: environment.CLOUDINARY_CLOUD_NAME,
})

export const deleteFile = (id: string) =>
    new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(id, (error: string, result?: string) =>
            error ? reject(error) : resolve(result)
        )
    })

export const getFile = (id: string) =>
    new Promise((resolve, reject) => {
        cloudinary.v2.api.resource(id, (result: any) =>
            result.error ? reject(result.error) : resolve(result)
        )
    })

export const uploadStreamFile = (fileStream: any, filename: string, options?: UploadApiOptions) =>
    new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const readStream = fileStream()
        // @ts-ignore
        const uploadStream = cloudinary.v2.uploader.upload_stream(options, (error, result) =>
            error ? reject(error) : resolve(result)
        )

        readStream.on('open', () => readStream.pipe(uploadStream))
    })
