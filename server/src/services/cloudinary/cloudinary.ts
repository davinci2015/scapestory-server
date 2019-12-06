/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import environment from 'config/environment'
const cloudinary = require('cloudinary').v2

interface UploadConfiguration {
    width? : number
    height? : number
}

interface CloudinaryUploadResult {
    public_id: string
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

export const uploadFile = (filePath: string, params?: UploadConfiguration) => new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(filePath, params, (error: Error, result? : any & CloudinaryUploadResult) => {
        if (error || !result) {
            reject(error)
        } else {
            resolve({
                publicId: result.public_id,
                secureUrl: result.secure_url
            })
        }
    })
})
