import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'
import gql from 'graphql-tag'
import {Plant, Livestock} from 'graphql/generated/types'

export enum AquascapeEditActions {
    AQUASCAPE_ADD_PLANT,
    AQUASCAPE_ADD_LIVESTOCK,
    AQUASCAPE_REMOVE_PLANT,
    AQUASCAPE_REMOVE_LIVESTOCK,
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

        case AquascapeEditActions.AQUASCAPE_REMOVE_LIVESTOCK:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id livestock { id name } }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.removeLivestock || !mutationData.removeLivestock.id) return

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        livestock: data.aquascape.livestock.filter(
                            (livestock: Livestock) =>
                                livestock.id !== mutationData.removeLivestock.id
                        ),
                    },
                },
            })

        case AquascapeEditActions.AQUASCAPE_ADD_LIVESTOCK:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id livestock { id name } }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.addLivestock || !mutationData.addLivestock.id) return

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        livestock: [...data.aquascape.livestock, mutationData.addLivestock],
                    },
                },
            })

        default:
            return null
    }
}
