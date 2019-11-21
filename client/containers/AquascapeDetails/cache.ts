import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'
import gql from 'graphql-tag'
import {AquascapeComment} from 'containers/AquascapeDetails/query'

export enum AquascapeDetailsActions {
    AQUASCAPE_LIKE,
    AQUASCAPE_USER_FOLLOW,
    AQUASCAPE_LIKE_COMMENT,
    AQUASCAPE_DISLIKE_COMMENT,
    AQUASCAPE_ADD_COMMENT,
    AQUASCAPE_REMOVE_COMMENT,
    AQUASCAPE_VISIT,
}

interface Payload {
    aquascapeId: number
    [key: string]: any
}

export const updateAquascapeDetailsCache = (
    action: AquascapeDetailsActions,
    payload: Payload
) => (cache: DataProxy, mutationResult: FetchResult<any>) => {
    const mutationData = mutationResult.data
    let query
    let data

    if (!mutationData) return

    switch (action) {
        case AquascapeDetailsActions.AQUASCAPE_LIKE:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id isLikedByMe likesCount }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        isLikedByMe: payload.isLiked,
                        likesCount: payload.isLiked
                            ? data.aquascape.likesCount + 1
                            : data.aquascape.likesCount - 1,
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_USER_FOLLOW:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id user { id isFollowedByMe } }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        user: {
                            ...data.aquascape.user,
                            isFollowedByMe: payload.isFollowed,
                        },
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_LIKE_COMMENT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id comments { id likes { id userId } } }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        comments: data.aquascape.comments.map(
                            (comment: AquascapeComment) =>
                                comment.id === mutationData.like.commentId
                                    ? {
                                          ...comment,
                                          likes: [
                                              ...comment.likes,
                                              mutationData.like,
                                          ],
                                      }
                                    : comment
                        ),
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_DISLIKE_COMMENT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id comments { id likes { id userId } } }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        comments: data.aquascape.comments.map(
                            (comment: AquascapeComment) =>
                                comment.id === mutationData.dislike.commentId
                                    ? {
                                          ...comment,
                                          likes: comment.likes.filter(
                                              like =>
                                                  like.id !==
                                                  mutationData.dislike.id
                                          ),
                                      }
                                    : comment
                        ),
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_ADD_COMMENT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id comments { id likes { id } user { id } } }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        comments: [
                            {
                                ...mutationData.addComment,
                                likes: [],
                                user: payload.user,
                            },
                            ...data.aquascape.comments,
                        ],
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_REMOVE_COMMENT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id comments { id } }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        comments: data.aquascape.comments.filter(
                            (comment: AquascapeComment) =>
                                comment.id !== mutationData.removeComment.id
                        ),
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_VISIT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id viewsCount }}`
            data = cache.readQuery<any>({query})

            console.log(mutationData)
            if (
                mutationData &&
                mutationData.visitAquascape &&
                mutationData.visitAquascape.created
            ) {
                cache.writeQuery({
                    query,
                    data: {
                        aquascape: {
                            ...data.aquascape,
                            viewsCount: data.aquascape.viewsCount + 1,
                        },
                    },
                })
            }

            return

        default:
            return null
    }
}
