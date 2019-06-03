import React from 'react'

type Props = {
    children: React.ReactNode,
    onClick: (...args: any[]) => any
}

const Button = ({children, ...rest}: Props) => (
    <button
        type="button"
        {...rest}>
        {children}
    </button>
)

export default Button