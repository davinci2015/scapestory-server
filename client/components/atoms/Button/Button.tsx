import React from 'react'
import cx from 'classnames'

import {colors, borderRadius, spaces} from 'styles'
import {Paragraph} from 'components/atoms'

interface Props extends React.HTMLProps<HTMLButtonElement> {
    children: React.ReactNode
    onClick?: (...args: any[]) => any
    variant?: 'default' | 'outlined'
    color?: 'primary' | 'secondary'
    type?: 'default' | 'small'
    leftIcon?: React.ReactNode
}

const classes = {
    root: 'button'
}

const paragraphColor = {
    primary: colors.WHITE,
    secondary: colors.PRIMARY
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
                small: type === 'small'
            })}
            {...rest}>
                
            {leftIcon}

            <Paragraph as="span" type="body" weight="bold" color={paragraphColor[color]}>
                {children}
            </Paragraph>

            <style jsx>{`
                .button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    white-space: nowrap;
                    
                    padding: ${spaces.s18} ${spaces.s24};
                    width: 100%;
                    min-width: 120px;

                    outline: 0;
                    border: 0;
                    border-radius: ${borderRadius.SECONDARY};
                    cursor: pointer;
                    transition: all 120ms ease-in-out;

                    ${type === 'small' && `
                        padding-top: ${spaces.s12}; 
                        padding-bottom: ${spaces.s12};
                    `}

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
                    border: 1px solid ${colors.SHADE_LIGHT}
                }

                .outlined {
                    background-color: transparent;
                    border: 1px solid ${colors.PRIMARY};
                }

                .small {
                    padding: ${spaces.s12} ${spaces.s24};
                }
            
            `}</style>
        </button>
    )

Button.classes = classes

export default Button