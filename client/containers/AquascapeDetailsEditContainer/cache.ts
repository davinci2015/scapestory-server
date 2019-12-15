import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'
import gql from 'graphql-tag'
import {Plant} from 'graphql/generated/types'

export enum AquascapeEditActions {
    AQUASCAPE_ADD_PLANT,
    AQUASCAPE_REMOVE_PLANT,
}

interface Payload {
    aquascapeId: number
    [key: string]: any
}

export const updateAquascapeEditCache = (action: AquascapeEditActions, payload: Payload) => (
    cache: DataProxy,
    mutationResult: FetchResult<any>
) => {
    const mutationData = mutationResult.data
    let query
    let data

    if (!mutationData) return

    switch (action) {
        case AquascapeEditActions.AQUASCAPE_REMOVE_PLANT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id plants { id name } }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.removePlant || !mutationData.removePlant.id) return

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        plants: data.aquascape.plants.filter(
                            (plant: Plant) => plant.id !== mutationData.removePlant.id
                        ),
                    },
                },
            })

        case AquascapeEditActions.AQUASCAPE_ADD_PLANT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id plants { id name } }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.addPlant || !mutationData.addPlant.id) return

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        plants: [...data.aquascape.plants, mutationData.addPlant],
                    },
                },
            })

        default:
            return null
    }
}
