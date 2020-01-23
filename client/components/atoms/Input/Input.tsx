import React from 'react'

import {borderRadius, colors, typography} from 'styles'
import {Paragraph, InputAdornment} from 'components/atoms'

const classes = {
    inputContainer: 'inputContainer',
}

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
    type?: string
    placeholder: string
    value?: string | number
    error?: boolean
    label: string
    errorMessage?: string | React.ReactNode
    endAdornment?: React.ReactNode
}

const Input = ({endAdornment, error, errorMessage, label, ...props}: InputProps) => {
    const inputRef = React.createRef<HTMLInputElement>()

    return (
        <>
            <div className={classes.inputContainer}>
                <div className="base">
                    <div className="root">
                        <input ref={inputRef} {...props} />
                        <label>{label}</label>
                        <fieldset className="outline"></fieldset>
                        <div className="highlighter"></div>
                    </div>
                    {endAdornment}
                </div>

                {error && (
                    <div className="error-message">
                        <Paragraph as="span" type="s2" color={colors.ERROR}>
                            {errorMessage}
                        </Paragraph>
                    </div>
                )}
            </div>
            <style jsx>{`
                input {
                    font-family: ${typography.fontFamily.PRIMARY};
                    font-weight: ${typography.fontWeight.semibold};

                    padding: 36px 12px 18px 30px;
                    outline: 0;
                    border: 0;
                    width: 100%;
                }

                input:focus ~ .highlighter {
                    opacity: 1;
                    height: 100%;
                    top: 0;
                }

                input:focus ~ label {
                    color: ${error ? colors.ERROR : colors.PRIMARY};
                }

                input:focus ~ .outline {
                    border-color: ${colors.MID_GRAY};
                }

                .highlighter {
                    opacity: 0;
                    position: absolute;
                    width: 6px;
                    height: 0;
                    left: 0;
                    top: 50%;

                    background-color: ${colors.PRIMARY};
                    border-top-left-radius: ${borderRadius.SECONDARY};
                    border-bottom-left-radius: ${borderRadius.SECONDARY};
                    transition: all 230ms ease-in-out;

                    ${error &&
                        `
                        background-color: ${colors.ERROR};
                        opacity: 1;
                        height: 100%;
                        top: 0;
                    `}
                }

                .outline {
                    pointer-events: none;
                    position: absolute;
                    margin: 0;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    border-width: 2px;
                    border-style: solid;
                    border-color: ${colors.SHADE_LIGHT};
                    border-radius: ${borderRadius.SECONDARY};
                }

                .base {
                    display: inline-flex;
                    width: 100%;
                    align-items: center;
                    justify-content: space-between;

                    background: ${colors.WHITE};
                    border-radius: ${borderRadius.SECONDARY};
                }

                .base :global(.${InputAdornment.classes.root}) {
                    margin: 18px;
                }

                .root {
                    width: 100%;
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
                    font-size: ${typography.fontSize.fs14};
                    pointer-events: none;

                    position: absolute;
                    top: 0;
                    left: 0;

                    transform: translate(30px, 14px);
                    transition: color 120ms linear;
                }

                .${classes.inputContainer} {
                    position: relative;
                    width: 100%;
                }

                .error-message {
                    position: absolute;
                    bottom: -24px;
                    left: 30px;
                }
            `}</style>
        </>
    )
}

Input.classes = classes

export default Input
