/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import environment from 'config/environment'
import {Stream} from 'stream'
const cloudinary = require('cloudinary').v2

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

cloudinary.config({
    api_key: environment.CLOUDINARY_API_KEY,
    api_secret: environment.CLOUDINARY_API_SECRET,
    cloud_name: environment.CLOUDINARY_CLOUD_NAME
})

export const deleteFile = (id: string) => new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(id, (error: string, result? : string) => error ? reject(error) : resolve(result))
})

export const getFile = (id: string) => new Promise((resolve, reject) => {
    cloudinary.api.resource(id, (result: any) => result.error ? reject(result.error) : resolve(result))
})

export const uploadStreamFile = (fileStream: Stream) => new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream((error, result: CloudinaryUploadResult) =>
        error ? reject(error) : resolve(result))

    fileStream.pipe(stream)
})