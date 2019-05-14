import React, {useState} from 'react'
import Input from './Input'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const PasswordInput = (props) => {
    const [passwordVisible, setPasswordVisibility] = useState(false)

    return (
        <Input
            type={passwordVisible ? 'test' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => setPasswordVisibility(!passwordVisible)}>
                        {passwordVisible ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            }
            {...props}
        />
    )
}

export default PasswordInput