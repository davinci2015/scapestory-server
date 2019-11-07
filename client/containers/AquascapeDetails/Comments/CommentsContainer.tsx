import React, {useContext, useCallback, FormEvent, useState} from 'react'
import {useQuery, useMutation} from 'react-apollo'
import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'

import CommentsSection from 'components/sections/AquascapeDetails/CommentsSection'
import {COMMENTS, CommentsQuery, AquascapeComment} from 'containers/AquascapeDetails/Comments/queries'
import {LIKE, LikeMutationResult, DislikeMutationResult, DISLIKE} from 'graphql/mutations'
import {LikeEntityType, CommentEntityType} from 'generated/graphql'
import {ModalContext} from 'providers/ModalProvider'
import {AuthContext} from 'providers/AuthenticationProvider'
import {ADD_COMMENT, AddCommentMutationResult, REMOVE_COMMENT, RemoveCommentMutationResult} from 'containers/AquascapeDetails/Comments/mutations'

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

    const readCommentsCache = (cache: DataProxy) => cache.readQuery<CommentsQuery>({query: COMMENTS, variables: {id: aquascapeId}})

    const updateCommentsCache = (comments: AquascapeComment[], cache: DataProxy) => cache.writeQuery({
        query: COMMENTS,
        variables: {id: aquascapeId},
        data: {comments}
    })

    const updateLikeCache = (cache: DataProxy, mutationResult: FetchResult<LikeMutationResult>) => {
        const cacheData = readCommentsCache(cache)
        const mutationData = mutationResult.data

        if (cacheData && mutationData) {
            updateCommentsCache(cacheData.comments.map((comment) => comment.id === mutationData.like.commentId
                ? {...comment, likes: [...comment.likes, mutationData.like]}
                : comment
            ), cache)
        }
    }

    const updateDislikeCache = (cache: DataProxy, mutationResult: FetchResult<DislikeMutationResult>) => {
        const cacheData = readCommentsCache(cache)
        const mutationData = mutationResult.data

        if (cacheData && mutationData) {
            updateCommentsCache(cacheData.comments.map((comment) => comment.id === mutationData.dislike.commentId
                ? {...comment, likes: comment.likes.filter((like) => like.id !== mutationData.dislike.id)}
                : comment
            ), cache)

        }
    }

    const updateAddCommentCache = (cache: DataProxy, mutationResult: FetchResult<AddCommentMutationResult>) => {
        const cacheData = readCommentsCache(cache)
        const mutationData = mutationResult.data

        if (cacheData && mutationData && user) {
            updateCommentsCache([
                {
                    ...mutationData.addComment,
                    likes: [],
                    user
                },
                ...cacheData.comments
            ], cache)
        }
    }

    const updateRemoveCommentCache = (cache: DataProxy, mutationResult: FetchResult<RemoveCommentMutationResult>) => {
        const cacheData = readCommentsCache(cache)
        const mutationData = mutationResult.data

        if (cacheData && mutationData && user) {
            updateCommentsCache(cacheData.comments.filter((comment) => comment.id !== mutationData.removeComment.id), cache)
        }
    }

    const [like] = useMutation(LIKE, {update: updateLikeCache})
    const [dislike] = useMutation(DISLIKE, {update: updateDislikeCache})
    const [addComment] = useMutation(ADD_COMMENT, {update: updateAddCommentCache})
    const [removeComment] = useMutation(REMOVE_COMMENT, {update: updateRemoveCommentCache})

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

    const handleRemoveComment = useCallback((comment: AquascapeComment) => {
        removeComment({variables: {id: comment.id}})
    }, [])

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
            removeComment={handleRemoveComment}
            onSubmit={onSubmit}
        />
    )
}

export default CommentsContainer