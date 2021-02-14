import {Injectable} from 'graphql-modules'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {SocialLogin} from 'db/models/SocialLogin'
import socialProviders from 'constants/socialProviders'

export interface SocialLoginRepositoryInterface extends BaseRepositoryInterface<SocialLogin> {
    addFacebookLogin(userId: number, socialId: string): Promise<SocialLogin>
    findSocialLogin(socialId: string): Promise<SocialLogin | null>
}

@Injectable()
export class SocialLoginRepository
    extends BaseRepository<SocialLogin>
    implements SocialLoginRepositoryInterface {
    constructor() {
        super(SocialLogin)
    }

    async findSocialLogin(socialId: string): Promise<SocialLogin | null> {
        return await this.findOne({
            where: {socialId},
        })
    }

    async addFacebookLogin(userId: number, socialId: string): Promise<SocialLogin> {
        return await this.create({
            userId,
            socialId,
            provider: socialProviders.FACEBOOK,
        })
    }
}
