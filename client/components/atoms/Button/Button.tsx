import React from 'react'
import cx from 'classnames'
import {colors, borderRadius, spaces} from 'styles'

type Props = {
    children: React.ReactNode,
    onClick?: (...args: any[]) => any,
    variant?: 'default' | 'outlined'
    color?: 'primary' | 'secondary'
}

const Button = ({
    children,
    variant = 'default',
    color = 'primary',
    ...rest
}: Props) => (
        <button
            type="button"
            className={cx('button', {
                outlined: variant === 'outlined',
                primary: color === 'primary',
                secondary: color === 'secondary'
            })}
            {...rest}>

            {children}

            <style jsx>{`
                .button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: ${borderRadius.SECONDARY};
                    width: 100%;
                    outline: 0;
                    border: 0;
                    cursor: pointer;
                    padding-top: ${spaces.s16}; 
                    padding-bottom: ${spaces.s16};
                    transition: background-color 120ms ease-in-out;
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
                    color: ${colors.PRIMARY};
                }
            
            `}</style>
        </button>
    )

export default Button