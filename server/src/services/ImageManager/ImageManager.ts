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

class ImageManager {
    constructor() {
        cloudinary.config({
            api_key: environment.CLOUDINARY_API_KEY,
            api_secret: environment.CLOUDINARY_API_SECRET,
            cloud_name: environment.CLOUDINARY_CLOUD_NAME
        })
    }

    deleteFile(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader.destroy(id, (error: string, result? : string) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }

    getFile(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinary.api.resource(id, (result: any) => {
                if (result.error) {
                    reject(result.error)
                }
                resolve(result)
            })
        })
    }

    uploadFile(filePath: string, params?: UploadConfiguration): Promise<any> {
        return new Promise((resolve, reject) => {
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
    }
}

export default ImageManager