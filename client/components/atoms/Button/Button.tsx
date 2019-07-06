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
            className={cx({
                outlined: variant === 'outlined',
                primary: color === 'primary',
                secondary: color === 'secondary'
            })}
            {...rest}>

            {children}

            <style jsx>{`
                button {
                    border-radius: ${borderRadius.SECONDARY};
                    width: 100%;
                    outline: 0;
                    border: 0;
                    cursor: pointer;
                    padding-top: ${spaces.s16}; 
                    padding-bottom: ${spaces.s16};
                }

                button:disabled {
                    pointer-events: none;
                    opacity: 0.4;
                }

                .primary {
                    color: ${colors.WHITE};
                    background-color: ${colors.PRIMARY};
                    transition: color 200ms ease-in-out;
                }

                .primary:hover {
                    background-color: ${colors.PRIMARY_DARK};
                }

                .secondary {

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