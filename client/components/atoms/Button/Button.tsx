import React from 'react'
import cx from 'classnames'

import {colors, borderRadius, spaces} from 'styles'
import {Paragraph} from 'components/atoms'

interface Props extends React.HTMLProps<HTMLButtonElement> {
    children: React.ReactNode
    onClick?: (...args: any[]) => any
    variant?: 'default' | 'outlined'
    color?: 'primary' | 'secondary'
    type?: 'default' | 'small' | 'block'
    leftIcon?: React.ReactNode
}

const classes = {
    root: 'button'
}

const Button = ({
    children,
    variant = 'default',
    color = 'primary',
    type = 'default',
    leftIcon,
    ...rest
}: Props) => (
        <button
            // @ts-ignore
            type="button"
            className={cx(classes.root, {
                outlined: variant === 'outlined',
                primary: color === 'primary',
                secondary: color === 'secondary',
                small: type === 'small',
                block: type === 'block'
            })}
            {...rest}>
                
            {leftIcon}

            <Paragraph as="span" type="body" weight="bold">
                {children}
            </Paragraph>

            <style jsx>{`
                .button {
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    white-space: nowrap;
                    
                    padding: 0 ${spaces.s24};
                    min-height: 60px;

                    outline: 0;
                    border: 0;
                    border-radius: ${borderRadius.SECONDARY};
                    cursor: pointer;
                    transition: all 120ms ease-in-out;

                    ${leftIcon && `
                        padding-left: ${spaces.s18};
                    `}
                }

                button :global(svg),
                button :global(img) {
                    margin-right: ${spaces.s12};
                    width: ${spaces.s24};
                    height: ${spaces.s24};
                }

                button:disabled {
                    pointer-events: none;
                    opacity: 0.4;
                }

                .primary {
                    color: ${colors.WHITE};
                    background-color: ${colors.PRIMARY};
                }

                .primary:hover {
                    background-color: ${colors.PRIMARY_DARK};
                }

                .secondary {
                    color: ${colors.BLACK};
                    background-color: ${colors.WHITE};
                    border: 2px solid ${colors.SHADE_LIGHT}
                }

                .outlined {
                    color: ${colors.PRIMARY};
                    background-color: transparent;
                    border: 2px solid ${colors.PRIMARY};
                }

                .outlined:hover {
                    background-color: transparent;
                }

                .small {
                    min-height: 44px;
                }

                .block {
                    width: 100%;
                }
            
            `}</style>
        </button>
    )

Button.classes = classes

export default Button