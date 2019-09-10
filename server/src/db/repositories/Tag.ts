import {Injectable} from '@graphql-modules/di'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Tag} from 'db/models/Tag'

export interface TagRepositoryInterface extends BaseRepositoryInterface<Tag> {
}

@Injectable()
export class TagRepository extends BaseRepository<Tag> {
    constructor() {
        super(Tag)
    }
}