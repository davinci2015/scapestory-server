/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import environment from 'config/environment'
import cloudinary = require('cloudinary')
import {UploadApiOptions} from 'cloudinary'

type ImageTypes = 'userProfileImage' | 'userCoverImage' | 'aquascapeImage' | 'aquascapeMainImage'

type ImageUploadOptions = {
    [key in ImageTypes]: UploadApiOptions
}

export const imageUploadOptions: ImageUploadOptions = {
    userProfileImage: {
        folder: 'profile_images',
        format: 'jpg',
        transformation: {
            width: 142,
            height: 142,
            crop: 'fill',
            q: 'auto:good',
        },
    },
    userCoverImage: {
        folder: 'cover_images',
        format: 'jpg',
        transformation: {
            width: 1470,
            height: 270,
            crop: 'lfill',
            quality: 'auto:good',
        },
    },
    aquascapeImage: {
        folder: 'aquascape_images',
        format: 'jpg',
        transformation: {
            width: 1024,
            height: 768,
            crop: 'lfill',
            quality: 'auto:good',
        },
    },
    aquascapeMainImage: {
        folder: 'aquascape_main_images',
        format: 'jpg',
        transformation: {
            width: 1440,
            height: 900,
            crop: 'lfill',
            quality: 'auto:best',
        },
    },
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

export const uploadStreamFile = (fileStream: any, options?: UploadApiOptions) =>
    new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const readStream = fileStream()
        // @ts-ignore
        const uploadStream = cloudinary.v2.uploader.upload_stream(options, (error, result) =>
            error ? reject(error) : resolve(result)
        )

        readStream.on('open', () => readStream.pipe(uploadStream))
    })
