import React, {useContext, useCallback, FormEvent, useState} from 'react'
import {useMutation} from 'react-apollo'

import CommentsSection from 'components/sections/AquascapeDetails/CommentsSection'
import {LIKE, DISLIKE} from 'graphql/mutations'
import {LikeEntityType, CommentEntityType} from 'generated/graphql'
import {ModalContext} from 'providers/ModalProvider'
import {AuthContext} from 'providers/AuthenticationProvider'
import {ADD_COMMENT, REMOVE_COMMENT} from 'containers/AquascapeDetails/Comments/mutations'
import {AquascapeComment} from 'containers/AquascapeDetails/query'
import {updateAquascapeDetailsCache, AquascapeDetailsActions} from 'containers/AquascapeDetails/cache'

interface Props {
    aquascapeId: number,
    comments: AquascapeComment[]
}

const CommentsContainer: React.FunctionComponent<Props> = ({aquascapeId, comments}) => {
    const [comment, updateComment] = useState<string | null>(null)
    const {isAuthenticated, user} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)

    const handleCommentChange = (e: FormEvent<HTMLTextAreaElement>) => {
        const value = (e.target as HTMLTextAreaElement).value
        updateComment(value)
    }

    const [like] = useMutation(LIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_LIKE_COMMENT, { aquascapeId }) 
    })
    
    const [dislike] = useMutation(DISLIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_DISLIKE_COMMENT, { aquascapeId }) 
    })

    const [addComment] = useMutation(ADD_COMMENT, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_ADD_COMMENT, { aquascapeId, user }) 
    })

    const [removeComment] = useMutation(REMOVE_COMMENT, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_REMOVE_COMMENT, { aquascapeId }) 
    })

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

    return (
        <CommentsSection
            userId={user ? user.id : undefined}
            enteredComment={comment || ''}
            userImage={user ? user.profileImage : undefined}
            toggleLike={toggleLike}
            comments={comments}
            onCommentChange={handleCommentChange}
            removeComment={handleRemoveComment}
            onSubmit={onSubmit}
        />
    )
}

export default CommentsContainer