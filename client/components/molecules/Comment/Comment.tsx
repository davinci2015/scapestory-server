import React, {useCallback} from 'react'
import classnames from 'classnames'

import {UserImage, FormattedMessage, Icon} from 'components/atoms'
import {typography, spaces, colors, media, breakpoints} from 'styles'
import {formatDate, dateFormats} from 'utils/date'
import {CommentFieldsFragment} from 'graphql/generated/queries'
import {ProfileLink, Hide} from 'components/core'
import {UserImageSize} from 'components/atoms/UserImage/UserImage'
import {pxToNumber} from 'utils/converter'

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
                    <UserImage size={UserImageSize.s36} image={comment.user.profileImage} />
                </ProfileLink>
                <div className="wrapper">
                    <ProfileLink slug={comment.user.slug}>
                        <span className="username">{comment.user.name}</span>
                    </ProfileLink>
                    <span className="content">{comment.content}</span>
                    <div className="bottom">
                        <div className="bottom__actions">
                            <span className="date">
                                {formatDate(parseInt(comment.createdAt), dateFormats.PRIMARY)}
                            </span>
                            <Hide upTo={pxToNumber(breakpoints.large)}>
                                <div className="divider"></div>
                            </Hide>
                            <div>
                                <span
                                    onClick={onLikeClick}
                                    className={classnames('action', {
                                        'action--active': isLiked,
                                    })}
                                >
                                    <FormattedMessage
                                        id="comment.action.like"
                                        defaultMessage="Like"
                                    />
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
                    font-size: ${typography.fontSize.fs18};
                    font-weight: ${typography.fontWeight.extraBold};
                }

                .comment .content {
                    display: block;
                    margin: ${spaces.s12} 0;
                    font-size: ${typography.fontSize.fs16};
                    word-break: break-word;
                    white-space: pre-wrap;
                }

                .bottom :global(span) {
                    font-weight: ${typography.fontWeight.semibold};
                    color: ${colors.SHADE_DEEP};
                }

                .bottom {
                    display: flex;
                    flex-direction: column;
                }

                .bottom .date {
                    margin-bottom: ${spaces.s8};
                    font-size: ${typography.fontSize.fs14};
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

                .bottom__actions {
                    display: flex;
                    flex-direction: column;
                }

                .bottom__actions .action {
                    margin-right: ${spaces.s16};
                    font-weight: ${typography.fontWeight.extraBold};

                    transition: color 80ms linear;
                    cursor: pointer;
                }

                .bottom__actions .action--active {
                    color: ${colors.PRIMARY};
                }

                .bottom .info {
                    margin-top: ${spaces.s24};
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

                @media ${media.up('large')} {
                    .bottom {
                        justify-content: space-between;
                        flex-direction: row;
                    }

                    .bottom__actions {
                        flex-direction: row;
                    }

                    .bottom .date {
                        margin-right: ${spaces.s16};
                        margin-bottom: 0;
                        font-size: ${typography.fontSize.fs16};
                    }

                    .bottom .info {
                        margin-top: 0;
                    }

                    .bottom__actions .action {
                        margin: 0 ${spaces.s16};
                    }

                    .comment .content {
                        margin: ${spaces.s12} 0;
                        font-size: ${typography.fontSize.fs20};
                    }

                    .comment .username {
                        display: block;
                        color: ${colors.BLACK};
                        font-size: ${typography.fontSize.fs20};
                        font-weight: ${typography.fontWeight.extraBold};
                    }
                }
            `}</style>
        </>
    )
}

Comment.classes = classes

export default Comment
