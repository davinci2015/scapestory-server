import {InputProps} from 'components/atoms/Input/Input'
import React, {useState} from 'react'
import Input from 'components/atoms/Input'

type Props = InputProps & {}

const PasswordInput = (props: Props) => {
    const [passwordVisible, setPasswordVisibility] = useState(false)

    return (
        <Input
            type={passwordVisible ? 'test' : 'password'}
            {...props}
        />
    )
}

export default PasswordInput