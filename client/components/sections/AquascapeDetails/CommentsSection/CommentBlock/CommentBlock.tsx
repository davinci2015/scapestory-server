import React, {useState, FormEvent} from 'react'
import {useIntl} from 'react-intl'

import {Grid} from 'components/core'
import Comment from 'components/molecules/Comment/Comment'
import {CommentFieldsFragment} from 'graphql/generated/queries'
import CommentInput from 'components/sections/AquascapeDetails/CommentsSection/CommentInput'
import {FormattedMessage} from 'components/atoms'
import {spaces, media} from 'styles'

interface Props {
    comment: CommentFieldsFragment
    childComments?: CommentFieldsFragment[]
    removeComment: (comment: CommentFieldsFragment) => void
    replies: {[key: number]: string | undefined}
    onReplyChange: (e: FormEvent<HTMLTextAreaElement>, commentId: number) => void
    onReply: (commentId: number) => void
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
    replies,
    onReply,
    onReplyChange,
    removeComment,
}) => {
    const intl = useIntl()
    const [open, setOpen] = useState(false)

    const toggleChildComments = () => setOpen(!open)

    const renderComment = (comment: CommentFieldsFragment) => (
        <Comment
            likesCount={comment.likes.length}
            repliesCount={childComments.length}
            isLiked={comment.likes.some(like => like.userId === userId)}
            comment={comment}
            onReply={toggleChildComments}
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
                        {childComments
                            .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
                            .map(childComment => (
                                <Grid.Item key={childComment.id} extraSmall={12} medium={6}>
                                    {renderComment(childComment)}
                                </Grid.Item>
                            ))}
                        <Grid.Item key={comment.id} extraSmall={12} medium={6}>
                            <CommentInput
                                value={replies[comment.id]}
                                onChange={e => onReplyChange(e, comment.id)}
                                onSubmit={() => onReply(comment.id)}
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
                    padding-left: ${spaces.s18};
                }

                @media ${media.up('large')} {
                    .child-wrapper {
                        padding-left: ${spaces.s54};
                    }
                }
            `}</style>
        </>
    )
}

export default CommentsBlock
