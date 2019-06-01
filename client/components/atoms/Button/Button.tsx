import React from 'react'

type Props = {
    children: React.ReactNode,
    onClick: (...args: any[]) => void
}

const Button = ({children, ...rest}: Props) => (
    <button
        type="button"
        {...rest}>
        {children}
    </button>
)

export default Button