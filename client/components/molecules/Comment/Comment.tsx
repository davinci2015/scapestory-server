import React, {useCallback} from 'react'

import {UserImage, FormattedMessage} from 'components/atoms'
import {typography, spaces, colors} from 'styles'
import {formatDate, dateFormats} from 'utils/date'
import {AquascapeComment} from 'containers/AquascapeDetails/Comments/queries'

const classes = {
    root: 'comment'
}

interface Props {
    comment: AquascapeComment
    isLiked: boolean
    onRemove?: (comment: AquascapeComment) => void
    onLike: (comment: AquascapeComment) => void
}

type CardInterface = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const Comment: CardInterface = ({comment, isLiked, onLike, onRemove}) => {
    const onLikeClick = useCallback(() => onLike(comment), [comment, onLike])
    const onRemoveClick = useCallback(() => onRemove && onRemove(comment), [comment, onRemove])

    return (
        <>
            <div className={classes.root}>
                <UserImage size="large" image={comment.user.profileImage} />
                <div className="wrapper">
                    <span className="username">{comment.user.username}</span>
                    <span className="content">{comment.content}</span>
                    <div className="bottom">
                        <span className="date">{formatDate(parseInt(comment.createdAt), dateFormats.PRIMARY)}</span>
                        <div className="divider"></div>
                        <span className="action" onClick={onLikeClick}>
                            {
                                isLiked
                                    ? <FormattedMessage id="comment.action.like" defaultMessage="Dislike" />
                                    : <FormattedMessage id="comment.action.like" defaultMessage="Like" />
                            }
                        </span>
                        {
                            Boolean(onRemove) &&
                            <span className="action" onClick={onRemoveClick}>
                                <FormattedMessage id="comment.action.remove" defaultMessage="Remove" />
                            </span>
                        }
                    </div>
                </div>
            </div>

            <style jsx>{`
                .comment {
                    position: relative;
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

                .bottom .action:hover {
                    color: ${colors.BLACK};
                }
            `}</style>
        </>
    )
}

Comment.classes = classes

export default Comment