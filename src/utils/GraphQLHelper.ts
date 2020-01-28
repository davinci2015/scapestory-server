/* eslint-disable @typescript-eslint/no-explicit-any */
import * as graphqlFields from 'graphql-fields'
import {Includeable} from 'sequelize/types'
import {GraphQLResolveInfo} from 'graphql'

const flattenObjectKeys = (obj: Record<string, any>) =>
    Object.keys(obj).reduce((acc, key) => {
        acc = [...acc, ...flattenObjectKeys(obj[key])]
        return [...acc, key]
    }, [] as string[])

export class GraphQLHelper {
    static getIncludeableFields(
        info: GraphQLResolveInfo,
        modelMapping: {[key: string]: any}
    ) {
        // @ts-ignore
        const fields = flattenObjectKeys(graphqlFields(info))
        const include: Includeable[] = []

        for (const key in modelMapping) {
            if (fields.includes(key)) {
                include.push({model: modelMapping[key]})
            }
        }

        return include
    }

    static ensureOrder = <ModelType>(options: {docs: ModelType[], keys: (string | number)[], prop: string}) => {
        const {
            docs,
            keys,
            prop,
        } = options

        const docsMap = new Map()
        docs.forEach(doc => docsMap.set(doc[prop], doc))
        return keys.map(key => docsMap.get(key))
    }
}
