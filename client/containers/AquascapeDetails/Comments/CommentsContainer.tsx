import React, {useContext, useCallback} from 'react'
import {useQuery, useMutation} from 'react-apollo'
import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'

import CommentsSection from 'components/sections/AquascapeDetails/CommentsSection'
import {COMMENTS, CommentsQuery, AquascapeComment} from 'containers/AquascapeDetails/Comments/query'
import {LIKE, LikeMutationResult, DislikeMutationResult, DISLIKE} from 'graphql/mutations'
import {LikeEntityType} from 'generated/graphql'
import {ModalContext} from 'providers/ModalProvider'
import {AuthContext} from 'providers/AuthenticationProvider'

interface Props {
    aquascapeId: number
}

const CommentsContainer: React.FunctionComponent<Props> = ({aquascapeId}) => {
    const {isAuthenticated, user} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)

    const {
        data,
        error,
        loading
    } = useQuery<CommentsQuery>(COMMENTS, {variables: {id: aquascapeId}})

    const updateLikeCache = (cache: DataProxy, mutationResult: FetchResult<LikeMutationResult>) => {
        const cacheData = cache.readQuery<CommentsQuery>({query: COMMENTS, variables: {id: aquascapeId}})
        const mutationData = mutationResult.data

        if (cacheData && mutationData) {
            cache.writeQuery({
                query: COMMENTS,
                data: {
                    comments: cacheData.comments.map((comment) => comment.id === mutationData.like.commentId
                        ? {...comment, likes: [...comment.likes, mutationData.like]}
                        : comment
                    )
                }
            })
        }
    }

    const updateDislikeCache = (cache: DataProxy, mutationResult: FetchResult<DislikeMutationResult>) => {
        const cacheData = cache.readQuery<CommentsQuery>({query: COMMENTS, variables: {id: aquascapeId}})
        const mutationData = mutationResult.data

        if (cacheData && mutationData) {
            cache.writeQuery({
                query: COMMENTS,
                data: {
                    comments: cacheData.comments.map((comment) => comment.id === mutationData.like.commentId
                        ? {...comment, likes: comment.likes.filter((like) => like.id === mutationData.like.id)}
                        : comment
                    )
                }
            })
        }
    }

    const [like] = useMutation(LIKE, {update: updateLikeCache})
    const [dislike] = useMutation(DISLIKE, {update: updateDislikeCache})

    const toggleLike = useCallback((comment: AquascapeComment) => {
        if (!isAuthenticated || !user) {
            return openModal('login')
        }

        const alreadyLiked = comment.likes.find((like) => like.id === user.id)
        const mutation = alreadyLiked ? dislike : like
        const variables = {entity: LikeEntityType.Comment, entityId: comment.id}
        
        mutation({variables})
    }, [isAuthenticated])

    if (loading) {
        // TODO: Show loader
        return null
    }

    if (error) {
        // TODO: Show error
        return null
    }

    if (!data || !data.comments) {
        // TODO: Return not found page
        return null
    }

    return (
        <CommentsSection
            userImage={user ? user.profileImage : undefined}
            toggleLike={toggleLike}
            comments={data.comments}
        />
    )
}

export default CommentsContainer