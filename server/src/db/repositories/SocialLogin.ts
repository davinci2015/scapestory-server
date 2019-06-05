import {Injectable} from '@graphql-modules/di'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {SocialLogin} from 'db/models/SocialLogin'
import {appConstants} from 'constants/appConstants'

export interface SocialLoginRepositoryInterface extends BaseRepositoryInterface<SocialLogin> {
    addFacebookLogin(userId: number, socialId: string): Promise<SocialLogin>
    findFacebookLogin(socialId: string): Promise<SocialLogin | null>
}

@Injectable()
export class SocialLoginRepository extends BaseRepository<SocialLogin> implements SocialLoginRepositoryInterface {
    constructor() {
        super(SocialLogin)
    }

    async findFacebookLogin(socialId: string): Promise<SocialLogin | null> {
        return await this.findOne({
            where: {
                socialId,
                provider: appConstants.socialLoginProviders.FACEBOOK
            }
        })
    }

    async addFacebookLogin(userId: number, socialId: string): Promise<SocialLogin> {
        return await this.create({
            userId, socialId, provider: appConstants.socialLoginProviders.FACEBOOK
        })
    }
}