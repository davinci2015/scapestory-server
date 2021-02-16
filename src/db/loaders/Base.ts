export class BaseDataLoader {
    // https://github.com/graphql/dataloader#batch-function
    ensureOrder = <ModelType>(options: {
        docs: ModelType[]
        keys: (string | number)[]
        prop: string
    }) => {
        const {docs, keys, prop} = options

        const docsMap = new Map()
        docs.forEach(doc => docsMap.set(doc[prop], doc))

        return keys.map(key => docsMap.get(key))
    }
}
