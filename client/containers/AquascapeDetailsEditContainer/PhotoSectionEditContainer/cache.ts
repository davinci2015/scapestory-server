import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'
import gql from 'graphql-tag'
import {AquascapeImage} from 'graphql/generated/types'

export enum AquascapeImageActions {
    AQUASCAPE_ADD_IMAGE,
    AQUASCAPE_DELETE_IMAGE,
}

interface Payload {
    aquascapeId: number
    [key: string]: any
}

export const updateAquascapeImageCache = (action: AquascapeImageActions, payload: Payload) => (
    cache: DataProxy,
    mutationResult: FetchResult<any>
) => {
    const mutationData = mutationResult.data
    let query
    let data

    if (!mutationData) return

    switch (action) {
        case AquascapeImageActions.AQUASCAPE_DELETE_IMAGE:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id images { id } }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.deleteAquascapeImage) return

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        images: data.aquascape.images.filter(
                            (image: AquascapeImage) => image.id !== payload.imageId
                        ),
                    },
                },
            })

        case AquascapeImageActions.AQUASCAPE_ADD_IMAGE:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id images { id url title createdAt } }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.addAquascapeImage || !mutationData.addAquascapeImage.id) return

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        images: [mutationData.addAquascapeImage, ...data.aquascape.images],
                    },
                },
            })

        default:
            return null
    }
}
