import React, {ChangeEvent} from 'react'

export interface InputProps {
    type?: string
    placeholder?: string
    value?: string | number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => (
    <input {...props} />
)

export default Input