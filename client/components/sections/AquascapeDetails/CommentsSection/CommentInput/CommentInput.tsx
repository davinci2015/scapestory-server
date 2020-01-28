import React, {FormEvent} from 'react'

import {Textarea, InputAdornment, Button, UserImage} from 'components/atoms'
import {spaces, typography, breakpoints, media} from 'styles'
import {UserImageSize} from 'components/atoms/UserImage/UserImage'
import {Hide} from 'components/core'
import {pxToNumber} from 'utils/converter'

interface Props {
    userImage?: string | null
    value?: string
    onChange: (e: FormEvent<HTMLTextAreaElement>) => void
    onSubmit: () => void
    placeholder: string
    submitText: React.ReactNode
}

const CommentInput: React.FunctionComponent<Props> = ({
    onChange,
    onSubmit,
    placeholder,
    submitText,
    userImage,
    value,
}) => (
    <>
        <div className="textarea">
            <Hide upTo={pxToNumber(breakpoints.medium)}>
                <UserImage size={UserImageSize.s36} image={userImage} />
            </Hide>
            <Textarea
                rows={1}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={400}
                endAdornment={
                    <Hide upTo={pxToNumber(breakpoints.large)}>
                        <InputAdornment>
                            <Button dimensions="small" onClick={onSubmit}>
                                {submitText}
                            </Button>
                        </InputAdornment>
                    </Hide>
                }
            />
        </div>
        <Hide after={pxToNumber(breakpoints.large)}>
            <div className="submit-btn">
                <Button dimensions="small" onClick={onSubmit}>
                    {submitText}
                </Button>
            </div>
        </Hide>
        <style jsx>{`
            .textarea {
                display: flex;
                align-items: center;
                font-size: ${typography.fontSize.fs16};
                width: 100%;
            }

            .submit-btn {
                margin-top: ${spaces.s16};
            }

            .textarea :global(.${UserImage.classes.root}) {
                margin-right: ${spaces.s24};
                flex-shrink: 0;
            }

            @media ${media.up('medium')} {
                .textarea {
                    font-size: ${typography.fontSize.fs20};
                }
            }
        `}</style>
    </>
)

export default CommentInput
