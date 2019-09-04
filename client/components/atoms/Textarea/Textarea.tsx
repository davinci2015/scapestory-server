import React from 'react'

import {colors, typography, borderRadius} from 'styles'
import {Paragraph} from 'components/atoms'

const classes = {
    textarea: 'textarea'
}

export interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
    placeholder: string
    value?: string | number
    error?: boolean
    errorMessage?: string | React.ReactNode
}

const Textarea = ({
    errorMessage,
    error,
    placeholder,
    ...props
}: TextareaProps) => (
    <div className={classes.textarea}>
        <textarea
            placeholder={placeholder}
            rows={6}
            cols={10}
            {...props}
        />
        {
            error &&
            <div className="error-message">
                <Paragraph as="span" type="s2" color={colors.ERROR}>
                    {errorMessage}
                </Paragraph>
            </div>
        }

        <style jsx>{`
            .${classes.textarea} {
                position: relative;
                width: 100%;
            }

            textarea {
                padding: 30px;
                width: 100%;

                font-family: ${typography.fontFamily.PRIMARY};
                font-weight: ${typography.fontWeight.semibold};

                outline: 0;
                border-radius: ${borderRadius.SECONDARY};
                border: 2px solid ${colors.SHADE_LIGHT};
            }

            textarea::placeholder {
                color: ${colors.GRAY};
            }

            textarea:-ms-input-placeholder {
                color: ${colors.GRAY};
            }

            textarea::-ms-input-placeholder {
                color: ${colors.GRAY};
            }

            .error-message {
                position: absolute;
                bottom: -24px;
                left: 30px
            }
        `}</style>
    </div>
)

Textarea.classes = classes

export default Textarea