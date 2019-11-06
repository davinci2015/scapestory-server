import React, {FormEvent} from 'react'
import {useIntl} from 'react-intl'

import {FormattedMessage, Headline, Textarea, InputAdornment, Button, UserImage} from 'components/atoms'
import {Grid} from 'components/core'
import {spaces} from 'styles'
import {AquascapeComment} from 'containers/AquascapeDetails/Comments/query'
import Comment from 'components/molecules/Comment/Comment'

interface Props {
    comments: AquascapeComment[]
    userImage?: string
    userId?: number
    enteredComment: string
    onCommentChange: (e: FormEvent<HTMLTextAreaElement>) => void
    toggleLike: (comment: AquascapeComment) => void
    onSubmit: () => void
}

const CommentsSection: React.FunctionComponent<Props> = ({comments, toggleLike, onCommentChange, enteredComment, onSubmit, userImage, userId}) => {
    const intl = useIntl()

    return (
        <>
            <div className="section">
                <Headline as="h4">
                    <FormattedMessage
                        id="aquascape.comments.title"
                        defaultMessage="Aqua comments ({count})"
                        values={{count: comments.length.toString()}}
                    />
                </Headline>
                <Grid.Row>
                    <Grid.Item extraSmall={12} medium={6}>
                        <div className="textarea">
                            <UserImage size="large" image={userImage} />
                            <Textarea
                                rows={1}
                                value={enteredComment}
                                onChange={onCommentChange}
                                placeholder={intl.formatMessage({
                                    id: 'aquascape.comments.input.placeholder',
                                    defaultMessage: 'Write your comment here'
                                })}
                                endAdornment={
                                    <InputAdornment>
                                        <Button dimensions="small" onClick={onSubmit}>
                                            <FormattedMessage
                                                id="aquascape.comments.input.submit"
                                                defaultMessage="Post comment"
                                            />
                                        </Button>
                                    </InputAdornment>
                                }
                            />
                        </div>
                    </Grid.Item>
                </Grid.Row>
                <div className="list">
                    <Grid.Row>
                        {comments.map((comment) => (
                            <Grid.Item key={comment.id} extraSmall={12} medium={6}>
                                <Comment
                                    isLiked={comment.likes.some((like) => like.userId === userId)}
                                    comment={comment}
                                    onLike={toggleLike}
                                />
                            </Grid.Item>
                        ))}
                    </Grid.Row>
                </div>
            </div>
            <style jsx>{`
                .section {
                    padding: ${spaces.s120} 0;
                }

                .section :global(.${Headline.classes.root}) {
                    margin-bottom: ${spaces.s48};
                }

                .section .textarea {
                    display: flex;
                    align-items: center;
                    width: 100%;
                }

                .section .list {
                    margin-top: ${spaces.s30};
                }

                .section :global(.${Comment.classes.root}) {
                    margin: ${spaces.s30} 0;
                }

                .section .textarea :global(.${UserImage.classes.root}) {
                    margin-right: ${spaces.s24};
                    flex-shrink: 0;
                }
            `}</style>
        </>
    )
}

export default CommentsSection