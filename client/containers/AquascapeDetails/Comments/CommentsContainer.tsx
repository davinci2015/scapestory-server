import React, {useContext, useCallback, FormEvent, useState} from 'react'
import {useQuery, useMutation} from 'react-apollo'
import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'

import CommentsSection from 'components/sections/AquascapeDetails/CommentsSection'
import {COMMENTS, CommentsQuery, AquascapeComment, ADD_COMMENT, AddCommentMutationResult} from 'containers/AquascapeDetails/Comments/query'
import {LIKE, LikeMutationResult, DislikeMutationResult, DISLIKE} from 'graphql/mutations'
import {LikeEntityType, CommentEntityType} from 'generated/graphql'
import {ModalContext} from 'providers/ModalProvider'
import {AuthContext} from 'providers/AuthenticationProvider'

interface Props {
    aquascapeId: number
}

const CommentsContainer: React.FunctionComponent<Props> = ({aquascapeId}) => {
    const [comment, updateComment] = useState<string | null>(null)
    const {isAuthenticated, user} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)

    const {
        data,
        error,
        loading
    } = useQuery<CommentsQuery>(COMMENTS, {variables: {id: aquascapeId}})

    const handleCommentChange = (e: FormEvent<HTMLTextAreaElement>) => {
        const value = (e.target as HTMLTextAreaElement).value
        updateComment(value)
    }

    const updateLikeCache = (cache: DataProxy, mutationResult: FetchResult<LikeMutationResult>) => {
        const cacheData = cache.readQuery<CommentsQuery>({query: COMMENTS, variables: {id: aquascapeId}})
        const mutationData = mutationResult.data

        if (cacheData && mutationData) {
            cache.writeQuery({
                query: COMMENTS,
                variables: {id: aquascapeId},
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
                variables: {id: aquascapeId},
                data: {
                    comments: cacheData.comments.map((comment) => comment.id === mutationData.dislike.commentId
                        ? {...comment, likes: comment.likes.filter((like) => like.id !== mutationData.dislike.id)}
                        : comment
                    )
                }
            })
        }
    }

    const updateCommentsCache = (cache: DataProxy, mutationResult: FetchResult<AddCommentMutationResult>) => {
        const cacheData = cache.readQuery<CommentsQuery>({query: COMMENTS, variables: {id: aquascapeId}})
        const mutationData = mutationResult.data

        if (cacheData && mutationData && user) {
            cache.writeQuery({
                query: COMMENTS,
                variables: {id: aquascapeId},
                data: {
                    comments: [{
                        ...mutationData.addComment,
                        likes: [],
                        user
                    }, ...cacheData.comments]
                }
            })
        }
    }

    const [like] = useMutation(LIKE, {update: updateLikeCache})
    const [dislike] = useMutation(DISLIKE, {update: updateDislikeCache})
    const [addComment] = useMutation(ADD_COMMENT, {update: updateCommentsCache})

    const onSubmit = () => {
        if (!comment) return

        updateComment(null)

        addComment({
            variables: {
                entity: CommentEntityType.Aquascape,
                entityId: aquascapeId,
                content: comment
            }
        })
    }

    const toggleLike = useCallback((comment: AquascapeComment) => {
        if (!isAuthenticated || !user) {
            return openModal('login')
        }

        const alreadyLiked = comment.likes.some((like) => like.userId === user.id)
        const variables = {entity: LikeEntityType.Comment, entityId: comment.id}

        alreadyLiked ? dislike({variables}) : like({variables})
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
            userId={user ? user.id : undefined}
            enteredComment={comment || ''}
            userImage={user ? user.profileImage : undefined}
            toggleLike={toggleLike}
            comments={data.comments}
            onCommentChange={handleCommentChange}
            onSubmit={onSubmit}
        />
    )
}

export default CommentsContainer