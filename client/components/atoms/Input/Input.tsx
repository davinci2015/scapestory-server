import React, {ChangeEvent} from 'react'
import {borderRadius, colors, typography} from 'styles'
import {Paragraph} from 'components/atoms'

export interface InputProps {
    type?: string
    placeholder?: string
    value?: string | number,
    error?: boolean,
    errorMessage?: string | React.ReactNode
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
    errorMessage,
    error, 
    ...props
}: InputProps) => (
    <div className="container">
        <input {...props} />
        
        {error && <Paragraph as="span" size="s">{errorMessage}</Paragraph>}

        <style jsx>{`
            input {
                font-family: ${typography.fontFamily.PRIMARY};
                padding: 18px 18px;
                border: 1px solid ${colors.PRIMARY};
                outline: 0;
                border-radius: ${borderRadius.PRIMARY};
            }

            .container {
                position: relative;
            }

            .container :global(span) {
                color: red;
                position: absolute;
                bottom: -24px;
            }
        `}</style>
    </div>
)

export default Input