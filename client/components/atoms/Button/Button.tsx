import React from 'react'
import cx from 'classnames'
import {colors, borderRadius} from 'styles';

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
                    border-radius: ${borderRadius.PRIMARY};
                    outline: 0;
                    border: 0;
                    cursor: pointer;
                    padding-top: 16px; 
                    padding-bottom: 16px;
                }

                .primary {
                    color: ${colors.WHITE};
                    background-color: ${colors.PRIMARY};
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