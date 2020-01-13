import React, {useCallback} from 'react'
import classnames from 'classnames'

import {UserImage, FormattedMessage, Icon} from 'components/atoms'
import {typography, spaces, colors} from 'styles'
import {formatDate, dateFormats} from 'utils/date'
import {CommentFieldsFragment} from 'graphql/generated/queries'
import {ProfileLink} from 'components/core'

const classes = {
    root: 'comment',
}

interface Props {
    comment: CommentFieldsFragment
    isLiked: boolean
    likesCount: number
    repliesCount: number
    onReply?: () => void
    onRemove?: (comment: CommentFieldsFragment) => void
    onLike: (comment: CommentFieldsFragment) => void
}

type CardInterface = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const Comment: CardInterface = ({
    comment,
    isLiked,
    likesCount,
    onLike,
    onRemove,
    onReply,
    repliesCount,
}) => {
    const onLikeClick = useCallback(() => onLike(comment), [comment, onLike])
    const onRemoveClick = useCallback(() => onRemove && onRemove(comment), [comment, onRemove])

    return (
        <>
            <div className={classes.root}>
                <ProfileLink slug={comment.user.slug}>
                    <UserImage size="large" image={comment.user.profileImage} />
                </ProfileLink>
                <div className="wrapper">
                    <ProfileLink slug={comment.user.slug}>
                        <span className="username">{comment.user.name}</span>
                    </ProfileLink>
                    <span className="content">{comment.content}</span>
                    <div className="bottom">
                        <div>
                            <span className="date">
                                {formatDate(parseInt(comment.createdAt), dateFormats.PRIMARY)}
                            </span>
                            <div className="divider"></div>
                            <span
                                onClick={onLikeClick}
                                className={classnames('action', {
                                    'action--active': isLiked,
                                })}
                            >
                                <FormattedMessage id="comment.action.like" defaultMessage="Like" />
                            </span>
                            {!comment.parentCommentId && (
                                <span onClick={onReply} className="action">
                                    <FormattedMessage
                                        id="comment.action.reply"
                                        defaultMessage="Reply"
                                    />
                                </span>
                            )}
                            {onRemove && (
                                <span className="action" onClick={onRemoveClick}>
                                    <FormattedMessage
                                        id="comment.action.remove"
                                        defaultMessage="Remove"
                                    />
                                </span>
                            )}
                        </div>
                        <div className="info">
                            {!comment.parentCommentId && !!repliesCount && (
                                <div className="info-block" role="presentation" onClick={onReply}>
                                    <span>{repliesCount}</span>
                                    <Icon
                                        d={Icon.REPLY}
                                        viewBox="0 0 20 20"
                                        size={20}
                                        color={colors.SHADE_MIDDLE}
                                    />
                                </div>
                            )}
                            {!!likesCount && (
                                <div
                                    className="info-block"
                                    role="presentation"
                                    onClick={onLikeClick}
                                >
                                    <span>{likesCount}</span>
                                    <Icon d={Icon.HEART} size={20} color={colors.SHADE_MIDDLE} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .comment {
                    position: relative;
                    width: 100%;
                }

                .comment :global(.${UserImage.classes.root}) {
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                .wrapper {
                    margin-left: 66px;
                }

                .comment .username {
                    display: block;
                    color: ${colors.BLACK};
                    font-size: ${typography.fontSize.fs20};
                    font-weight: ${typography.fontWeight.extraBold};
                }

                .comment .content {
                    display: block;
                    margin: ${spaces.s12} 0;
                    font-size: ${typography.fontSize.fs20};
                }

                .bottom :global(span) {
                    font-weight: ${typography.fontWeight.semibold};
                    color: ${colors.SHADE_DEEP};
                }

                .bottom {
                    display: flex;
                    justify-content: space-between;
                }

                .bottom .date {
                    margin-right: ${spaces.s16};
                }

                .bottom .divider {
                    position: relative;
                    display: inline-block;
                    margin: 0 ${spaces.s16};
                    background-color: ${colors.SHADE_LIGHT};
                    width: 2px;
                    height: 18px;
                    top: 3px;
                    border-radius: 1px;
                }

                .bottom .action {
                    margin: 0 ${spaces.s16};
                    cursor: pointer;
                    font-weight: ${typography.fontWeight.extraBold};
                    transition: color 80ms linear;
                }

                .bottom .action--active {
                    color: ${colors.PRIMARY};
                }

                .bottom .info,
                .bottom .info-block {
                    display: flex;
                    align-items: center;
                }

                .bottom .info-block {
                    margin-right: ${spaces.s12};
                    cursor: pointer;
                }

                .bottom .info span {
                    margin-right: 2px;
                }
            `}</style>
        </>
    )
}

Comment.classes = classes

export default Comment
