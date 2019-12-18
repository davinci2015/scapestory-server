import React, {useState} from 'react'

import {Grid} from 'components/core'
import Comment from 'components/molecules/Comment/Comment'
import {CommentFieldsFragment} from 'graphql/generated/queries'
import {spaces} from 'styles'
import CommentInput from 'components/sections/AquascapeDetails/CommentsSection/CommentInput'
import {FormattedMessage} from 'components/atoms'
import {useIntl} from 'react-intl'

interface Props {
    comment: CommentFieldsFragment
    childComments?: CommentFieldsFragment[]
    removeComment: (comment: CommentFieldsFragment) => void
    reply: (comment: CommentFieldsFragment) => void
    toggleLike: (comment: CommentFieldsFragment) => void
    userId?: number
    userImage?: string | null
}

const CommentsBlock: React.FunctionComponent<Props> = ({
    comment,
    userId,
    userImage,
    childComments = [],
    toggleLike,
    removeComment,
}) => {
    const intl = useIntl()
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
                            <CommentInput
                                value={''}
                                onChange={() => {}}
                                onSubmit={() => {}}
                                userImage={userImage}
                                submitText={
                                    <FormattedMessage
                                        id="aquascape.comments.reply.submit"
                                        defaultMessage="Reply"
                                    />
                                }
                                placeholder={intl.formatMessage({
                                    id: 'aquascape.comments.reply.placeholder',
                                    defaultMessage: 'Write your reply here',
                                })}
                            />
                        </Grid.Item>
                    </div>
                )}
            </Grid.Item>
            <style jsx>{`
                .child-wrapper {
                    padding-left: ${spaces.s54};
                }
            `}</style>
        </>
    )
}

export default CommentsBlock
