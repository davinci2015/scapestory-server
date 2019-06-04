import React, {useState} from 'react'
import Input, {InputProps} from 'components/atoms/Input'

type Props = InputProps & {}

const PasswordInput = (props: Props) => {
    const [passwordVisible] = useState(false)

    return (
        <Input
            type={passwordVisible ? 'test' : 'password'}
            {...props}
        />
    )
}

export default PasswordInput