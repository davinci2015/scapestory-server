import {DataProxy} from 'apollo-cache'
import {AquascapeDetailsQuery, AQUASCAPE_DETAILS} from 'containers/AquascapeDetails/query'
import {FetchResult} from 'apollo-link';

export enum AquascapeDetailsActions {
    AQUASCAPE_LIKE,
    AQUASCAPE_FOLLOW,
    AQUASCAPE_LIKE_COMMENT,
    AQUASCAPE_DISLIKE_COMMENT,
    AQUASCAPE_ADD_COMMENT,
    AQUASCAPE_REMOVE_COMMENT
}

interface Payload {
    aquascapeId: number
    [key: string]: any
}

export const updateAquascapeDetailsCache = (action: AquascapeDetailsActions, payload: Payload) => (cache: DataProxy, mutationResult: FetchResult<any>) => {
    const data = cache.readQuery<AquascapeDetailsQuery>({query: AQUASCAPE_DETAILS, variables: {id: payload.aquascapeId}})
    const mutationData = mutationResult.data

    if (mutationData && data) {
        switch (action) {
            case AquascapeDetailsActions.AQUASCAPE_LIKE:
                return cache.writeQuery({
                    query: AQUASCAPE_DETAILS,
                    variables: {id: payload.aquascapeId},
                    data: {
                        ...data,
                        aquascape: {
                            ...data.aquascape,
                            isLikedByMe: payload.isLiked,
                            likesCount: 10,
                            viewsCount: 10
                        }
                    }
                })

            case AquascapeDetailsActions.AQUASCAPE_FOLLOW:
                return cache.writeQuery({
                    query: AQUASCAPE_DETAILS,
                    data: {
                        ...data,
                        aquascape: {
                            ...data.aquascape,
                            user: {
                                ...data.aquascape.user,
                                isFollowedByMe: payload.isFollowed
                            }
                        }
                    }
                })

            case AquascapeDetailsActions.AQUASCAPE_LIKE_COMMENT:
                return cache.writeQuery({
                    query: AQUASCAPE_DETAILS,
                    data: {
                        ...data,
                        aquascape: {
                            ...data.aquascape,
                            comments: data.aquascape.comments.map((comment) => comment.id === mutationData.like.commentId
                                ? {...comment, likes: [...comment.likes, mutationData.like]}
                                : comment
                            )
                        }
                    }
                })

            case AquascapeDetailsActions.AQUASCAPE_DISLIKE_COMMENT:
                return cache.writeQuery({
                    query: AQUASCAPE_DETAILS,
                    data: {
                        ...data,
                        aquascape: {
                            ...data.aquascape,
                            comments: data.aquascape.comments.map((comment) => comment.id === mutationData.dislike.commentId
                                ? {...comment, likes: comment.likes.filter((like) => like.id !== mutationData.dislike.id)}
                                : comment
                            )
                        }
                    }
                })

            case AquascapeDetailsActions.AQUASCAPE_ADD_COMMENT:
                return cache.writeQuery({
                    query: AQUASCAPE_DETAILS,
                    data: {
                        ...data,
                        aquascape: {
                            ...data.aquascape,
                            comments: [
                                {...mutationData.addComment, likes: [], user: payload.user},
                                ...data.aquascape.comments
                            ]
                        }
                    }
                })

            case AquascapeDetailsActions.AQUASCAPE_REMOVE_COMMENT:
                return cache.writeQuery({
                    query: AQUASCAPE_DETAILS,
                    data: {
                        ...data,
                        aquascape: {
                            ...data.aquascape,
                            comments: data.aquascape.comments.filter((comment) => comment.id !== mutationData.removeComment.id)
                        }
                    }
                })

            default:
                return null
        }
    }
}