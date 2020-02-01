import {Injectable} from '@graphql-modules/di'
import * as moment from 'moment'
import * as uuid from 'uuid/v4'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {EmailConfirmation} from 'db/models/EmailConfirmation'

export interface EmailConfirmationRepositoryInterface
    extends BaseRepositoryInterface<EmailConfirmation> {
    createConfirmationKey(email: string): Promise<EmailConfirmation>
    confirmEmail(email: string, code: string): Promise<boolean>
    confirmationExpired(email: string): Promise<boolean>
    findByEmail(email: string): Promise<EmailConfirmation | null>
}

@Injectable()
export class EmailConfirmationRepository extends BaseRepository<EmailConfirmation>
    implements EmailConfirmationRepositoryInterface {
    constructor() {
        super(EmailConfirmation)
    }

    findByEmail(email: string) {
        return this.findOne({where: {email}})
    }

    createConfirmationKey(email: string) {
        return this.create({
            email,
            code: uuid(),
            expiresAt: moment().add(3, 'hours'),
        })
    }

    async confirmEmail(email: string, code: string) {
        const isValidCode = await this.isValidCode(email, code)

        if (!isValidCode) {
            return false
        }

        await this.destroy({where: {email, code}})

        return true
    }

    async confirmationExpired(email: string) {
        const confirmation = await this.findOne({where: {email}})
        if (!confirmation) {
            return true
        }

        return Boolean(moment(confirmation.expiresAt).isBefore(moment()))
    }

    private async isValidCode(email: string, code: string) {
        const confirmation = await this.findOne({where: {email, code}})
        return Boolean(confirmation && moment(confirmation.expiresAt).isAfter(moment()))
    }
}
