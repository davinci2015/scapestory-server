import {Injectable} from '@graphql-modules/di'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {SocialLogin} from "db/models/SocialLogin"

export interface SocialLoginRepositoryInterface extends BaseRepositoryInterface<SocialLogin> {
}

@Injectable()
export class SocialLoginRepository extends BaseRepository<SocialLogin> {
    constructor() {
        super(SocialLogin)
    }
}