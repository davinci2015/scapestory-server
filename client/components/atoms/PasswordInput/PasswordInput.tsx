import React, {useState} from 'react'
import {InputProps} from 'components/atoms/Input'
import {Input, Icon, InputAdornment, IconButton} from 'components/atoms'
import {colors, typography} from 'styles'
import {FormattedMessage} from 'react-intl';

type Props = InputProps & {}

const PasswordInput = (props: Props) => {
    const [passwordVisible, togglePasswordVisibility] = useState(false)

    const toggleVisibility = () => togglePasswordVisibility(!passwordVisible)

    return (
        <>
            <Input
                endAdornment={
                    <InputAdornment>
                        <IconButton onClick={toggleVisibility}>
                            <span className="text">
                                {passwordVisible
                                    ? <FormattedMessage id="password_input_hide_password" defaultMessage="Hide" />
                                    : <FormattedMessage id="password_input_show_password" defaultMessage="Show" />
                                }
                            </span>
                            <Icon
                                viewBox="0 0 48 48"
                                d={passwordVisible ? Icon.EYE_HIDE : Icon.EYE_SHOW}
                                color={colors.MID_GRAY}
                            />
                        </IconButton>
                    </InputAdornment>
                }
                type={passwordVisible ? 'text' : 'password'}
                {...props}
            />
            <style jsx>{`
                .text {
                    font-size: ${typography.fontSize.fs14};
                    text-transform: uppercase;
                    color: ${colors.MID_GRAY};
                    margin-right: 8px;
                }    
            `}</style>
        </>
    )
}

export default PasswordInput