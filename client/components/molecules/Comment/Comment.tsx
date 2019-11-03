import React, {useCallback} from 'react'

import {UserImage} from 'components/atoms'
import {typography, spaces, colors} from 'styles'
import {formatDate, dateFormats} from 'utils/date'

const classes = {
    root: 'comment'
}

interface Props {
    id: number
    username: string
    content: string
    createdAt: number
    userImage?: string
    onLike: (id: number) => void
}

type CardInterface = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const Comment: CardInterface = ({id, username, content, createdAt, onLike, userImage}) => {
    const onLikeClick = useCallback(() => onLike(id), [id])

    return (
        <>
            <div className={classes.root}>
                <UserImage size="large" image={userImage} />
                <div className="wrapper">
                    <span className="username">{username}</span>
                    <span className="content">{content}</span>
                    <div className="bottom">
                        <span className="date">{formatDate(createdAt, dateFormats.PRIMARY)}</span>
                        <div className="divider"></div>
                        <span className="action" onClick={onLikeClick}>Like</span>
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

                .bottom .date {
                    font-weight: ${typography.fontWeight.semibold};
                    color: ${colors.SHADE_DEEP};
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
                    color: ${colors.SHADE_DEEP};
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