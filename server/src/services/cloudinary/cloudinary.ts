/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import environment from 'config/environment'
import {ReadStream} from 'fs'
import cloudinary = require('cloudinary')

interface UploadConfiguration {
    width? : number
    height? : number
}

interface CloudinaryUploadResult {
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
    cloud_name: environment.CLOUDINARY_CLOUD_NAME
})

export const deleteFile = (id: string) => new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(id, (error: string, result? : string) => error ? reject(error) : resolve(result))
})

export const getFile = (id: string) => new Promise((resolve, reject) => {
    cloudinary.v2.api.resource(id, (result: any) => result.error ? reject(result.error) : resolve(result))
})

export const uploadStreamFile = (fileStream: any, filename: string) =>
    new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const readStream = fileStream()
        const uploadStream = cloudinary.v2.uploader.upload_stream(filename, (error, result) =>
            error ? reject(error) : resolve(result))

        readStream.on('open', () => readStream.pipe(uploadStream))
    })