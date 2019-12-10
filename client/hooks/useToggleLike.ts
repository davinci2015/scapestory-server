import {useMutation} from 'react-apollo'
import {LIKE, DISLIKE} from 'graphql/mutations'
import {LikeEntityType} from 'graphql/generated/types'

export const useToggleLike = (initiallyLiked: Boolean = false) => {
    const [like] = useMutation(LIKE)
    const [dislike] = useMutation(DISLIKE)

    const toggleLike = (entity: LikeEntityType, entityId: number) => {
        const handler = initiallyLiked ? dislike : like
        initiallyLiked = !initiallyLiked
        handler({variables: {entity, entityId}})
    }

    return toggleLike
}
