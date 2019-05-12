import React, {useState} from 'react'
import css from 'styled-jsx/css'
import Input from './Input'

const styles = css`
    .container {
        position: relative;
        display: initial;
    }
    
    .icon {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
`

const PasswordInput = (props) => {
    const [passwordVisible, setPasswordVisibility] = useState(false)

    return (
        <div className="container">
            <Input
                type={passwordVisible ? 'test' : 'password'}
                {...props}
            />
            <div
                className="icon"
                onClick={() => setPasswordVisibility(!passwordVisible)}>
                {passwordVisible ? 'Hide' : 'Show'}
            </div>
            <style jsx>{styles}</style>
        </div>
    )
}

export default PasswordInput