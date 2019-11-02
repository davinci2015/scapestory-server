import React from 'react'

import {colors, typography, borderRadius} from 'styles'
import {Paragraph, InputAdornment} from 'components/atoms'

const classes = {
    textarea: 'textarea'
}

export interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
    placeholder: string
    value?: string | number
    error?: boolean
    rows?: number
    cols?: number
    errorMessage?: string | React.ReactNode
    endAdornment?: React.ReactNode
}

const Textarea = ({
    errorMessage,
    error,
    placeholder,
    endAdornment,
    rows = 6,
    cols = 10,
    ...props
}: TextareaProps) => (
        <>
            <div className={classes.textarea}>
                <div className="wrapper">
                    <textarea
                        placeholder={placeholder}
                        rows={rows}
                        cols={cols}
                        {...props}
                    />
                    {endAdornment}
                </div>
                {
                    error &&
                    <div className="error-message">
                        <Paragraph as="span" type="s2" color={colors.ERROR}>
                            {errorMessage}
                        </Paragraph>
                    </div>
                }
            </div>

            <style jsx>{`
                .${classes.textarea} {
                    position: relative;
                    width: 100%;
                }

                .wrapper {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    width: 100%;
                    padding-bottom: 0;

                    outline: 0;
                    background-color: ${colors.WHITE};
                    border-radius: ${borderRadius.SECONDARY};
                    border: 2px solid ${colors.SHADE_LIGHT};
                }

                .wrapper :global(.${InputAdornment.classes.root}) {
                    margin: 12px;
                }

                textarea {
                    width: 100%;
                    outline: 0;
                    border: 0;
                    padding: 28px 32px;

                    font-family: ${typography.fontFamily.PRIMARY};
                    font-weight: ${typography.fontWeight.semibold};

                    background-color: transparent;
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
        </>
    )

Textarea.classes = classes

export default Textarea