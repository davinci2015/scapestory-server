import {Injectable} from '@graphql-modules/di'
import * as moment from 'moment'
import * as uuid from 'uuid/v4'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {EmailConfirmation} from 'db/models/EmailConfirmation'

export interface EmailConfirmationRepositoryInterface
    extends BaseRepositoryInterface<EmailConfirmation> {
    createConfirmationKey(userId: number): Promise<EmailConfirmation>
    confirmEmail(userId: number, key: string): Promise<boolean>
}

@Injectable()
export class EmailConfirmationRepository extends BaseRepository<EmailConfirmation>
    implements EmailConfirmationRepositoryInterface {
    constructor() {
        super(EmailConfirmation)
    }

    createConfirmationKey(userId: number) {
        return this.create({
            userId,
            key: uuid(),
            expiresAt: moment().add(3, 'hours'),
        })
    }

    async confirmEmail(userId: number, key: string) {
        if (!this.isValidKey(userId, key)) {
            return false
        }

        await this.destroy({where: {userId, key}})

        return true
    }

    private async isValidKey(userId: number, key: string) {
        const confirmation = await this.findOne({where: {userId, key}})
        return confirmation && moment(confirmation.expiresAt).isBefore(moment())
    }
}
