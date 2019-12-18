import React, {FormEvent} from 'react'

import {Textarea, InputAdornment, Button, UserImage} from 'components/atoms'
import {spaces} from 'styles'

interface Props {
    userImage?: string | null
    value: string
    onChange: (e: FormEvent<HTMLTextAreaElement>) => void
    onSubmit: () => void
    placeholder: string
    submitText: React.ReactNode
}

const CommentInput: React.FunctionComponent<Props> = ({
    onChange,
    value,
    onSubmit,
    userImage,
    placeholder,
    submitText,
}) => (
    <>
        <div className="textarea">
            <UserImage size="large" image={userImage} />
            <Textarea
                rows={1}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                endAdornment={
                    <InputAdornment>
                        <Button dimensions="small" onClick={onSubmit}>
                            {submitText}
                        </Button>
                    </InputAdornment>
                }
            />
        </div>
        <style jsx>{`
            .textarea {
                display: flex;
                align-items: center;
                width: 100%;
            }

            .textarea :global(.${UserImage.classes.root}) {
                margin-right: ${spaces.s24};
                flex-shrink: 0;
            }
        `}</style>
    </>
)

export default CommentInput
