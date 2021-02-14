import {Injectable} from 'graphql-modules'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Hardscape} from 'db/models/Hardscape'

export interface HardscapeRepositoryInterface extends BaseRepositoryInterface<Hardscape> {
    getHardscape: () => Promise<Hardscape[]>
    findHardscapeById(id: number): Promise<Hardscape | null>
}

@Injectable()
export class HardscapeRepository
    extends BaseRepository<Hardscape>
    implements HardscapeRepositoryInterface {
    constructor() {
        super(Hardscape)
    }

    getHardscape() {
        return this.findAll({where: {predefined: true}})
    }

    findHardscapeById(id: number) {
        return this.findOne({where: {id}})
    }
}
