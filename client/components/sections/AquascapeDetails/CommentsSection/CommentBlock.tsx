import React, {useState} from 'react'

import {Grid} from 'components/core'
import Comment from 'components/molecules/Comment/Comment'
import {CommentFieldsFragment} from 'graphql/generated/queries'
import {spaces} from 'styles'

interface Props {
    comment: CommentFieldsFragment
    childComments?: CommentFieldsFragment[]
    removeComment: (comment: CommentFieldsFragment) => void
    reply: (comment: CommentFieldsFragment) => void
    toggleLike: (comment: CommentFieldsFragment) => void
    userId?: number
}

const CommentsBlock: React.FunctionComponent<Props> = ({
    comment,
    userId,
    childComments = [],
    toggleLike,
    removeComment,
}) => {
    const [open, setOpen] = useState(false)

    const openChildComments = () => setOpen(true)

    const renderComment = (comment: CommentFieldsFragment) => (
        <Comment
            likesCount={comment.likes.length}
            repliesCount={childComments.length}
            isLiked={comment.likes.some(like => like.userId === userId)}
            comment={comment}
            onReply={openChildComments}
            onRemove={comment.user.id === userId ? removeComment : undefined}
            onLike={toggleLike}
        />
    )

    return (
        <>
            <Grid.Item key={comment.id} extraSmall={12} medium={6}>
                {renderComment(comment)}
                {open && (
                    <div className="child-wrapper">
                        {childComments.map(comment => (
                            <Grid.Item key={comment.id} extraSmall={12} medium={6}>
                                {renderComment(comment)}
                            </Grid.Item>
                        ))}
                        <Grid.Item key={comment.id} extraSmall={12} medium={6}>
                            <h1>Reply input todo</h1>
                        </Grid.Item>
                    </div>
                )}
            </Grid.Item>
            <style jsx>{`
                .child-wrapper {
                    padding-left: ${spaces.s36};
                }
            `}</style>
        </>
    )
}

export default CommentsBlock
