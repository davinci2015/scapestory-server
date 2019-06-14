import React from 'react'

import {borderRadius, colors, typography} from 'styles'
import {Paragraph} from 'components/atoms'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
    type?: string
    placeholder?: string
    value?: string | number,
    error?: boolean,
    label?: string | undefined
    errorMessage?: string | React.ReactNode
}

const Input = ({
    errorMessage,
    error,
    label,
    ...props
}: InputProps) => (
        <div className="container">
            
            <input {...props} />

            <label>{label}</label>

            <div className="highlighter"></div>

            {error && <Paragraph as="span" size="s">{errorMessage}</Paragraph>}

            <style jsx>{`
            input {
                font-family: ${typography.fontFamily.PRIMARY};
                font-weight: ${typography.fontWeight.semibold};

                padding: 36px 12px 18px 30px;
                outline: 0;
                
                border: 1px solid ${error ? colors.ERROR : colors.PRIMARY};
                border-radius: ${borderRadius.SECONDARY};
            }

            input:focus ~ .highlighter {
                opacity: 1;
                height: 100%;
                top: 0;
            }

            input:focus ~ label {
                color: ${error ? colors.ERROR : colors.PRIMARY};
            }

            .highlighter {
                opacity: 0;
                position: absolute;
                
                width: 6px;
                height: 0;
                left: 0;
                top: 50%;
                background-color: ${error ? colors.ERROR : colors.PRIMARY};

                border-top-left-radius: ${borderRadius.SECONDARY};
                border-bottom-left-radius: ${borderRadius.SECONDARY};

                transition: all 230ms ease-in-out; 
            }

            input::placeholder {
                color: ${colors.GRAY};
            }

            input:-ms-input-placeholder {
                color: ${colors.GRAY};
            }

            input::-ms-input-placeholder {
                color: ${colors.GRAY};
            }

            label {
                font-size: ${typography.fontSize.XS};
                pointer-events: none;
                
                position: absolute;
                top: 0;
                left: 0;

                transform: translate(30px, 14px);
                transition: color 120ms linear;
            }

            .container {
                position: relative;
            }

            .container :global(span) {
                font-size: ${typography.fontSize.XS};
                color: ${colors.ERROR};

                position: absolute;
                bottom: -24px;
                left: 30px
            }
        `}</style>
        </div>
    )

export default Input