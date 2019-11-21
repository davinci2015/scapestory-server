import * as graphqlFields from 'graphql-fields'
import {Includeable} from 'sequelize/types'
import {GraphQLResolveInfo} from 'graphql'

export class GraphQLHelper {
    static getIncludeableFields(
        info: GraphQLResolveInfo,
        modelMapping: {[key: string]: any}
    ) {
        // @ts-ignore
        const fields = graphqlFields(info)
        const include: Includeable[] = []

        for (const key in modelMapping) {
            if (fields.hasOwnProperty(key)) {
                include.push({model: modelMapping[key]})
            }
        }

        return include
    }
}
