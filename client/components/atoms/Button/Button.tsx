import React from 'react'
import cx from 'classnames'

import {colors, borderRadius, spaces, typography} from 'styles'

interface Props extends React.HTMLProps<HTMLButtonElement> {
    children: React.ReactNode
    onClick?: (...args: any[]) => any
    variant?: 'default' | 'outlined'
    color?: 'primary' | 'secondary' | 'tertiary'
    dimensions?: 'default' | 'small' | 'extraSmall'
    type?: 'default' | 'block'
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
    dimensions = 'default',
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
                tertiary: color === 'tertiary',
                small: dimensions === 'small',
                extraSmall: dimensions === 'extraSmall',
                block: type === 'block'
            })}
            {...rest}>

            {leftIcon}

            {children}

            <style jsx>{`
                .button {
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    white-space: nowrap;
                    
                    padding: 0 ${spaces.s24};
                    min-height: 60px;

                    font-weight: ${typography.fontWeight.extraBold};
                    font-size: ${typography.fontSize.fs20};

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

                .tertiary {
                    color: ${colors.WHITE};
                    background-color: rgba(0, 0, 0, .3);
                }

                .tertiary:hover {
                    background-color: rgba(0, 0, 0, .5);
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
                    min-height: 48px;
                    font-size: ${typography.fontSize.fs16};
                }

                .extraSmall {
                    min-height: 36px;
                    font-size: ${typography.fontSize.fs13};
                    font-weight: ${typography.fontWeight.semibold};
                }

                .block {
                    width: 100%;
                }
            
            `}</style>
        </button>
    )

Button.classes = classes

export default Button