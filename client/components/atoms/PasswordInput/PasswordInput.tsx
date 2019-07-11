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
                        <div className="adornment">
                            <IconButton onClick={toggleVisibility}>
                                <span className="text">
                                    {passwordVisible 
                                        ? <FormattedMessage id="password_input_hide_password" defaultMessage="Hide"/> 
                                        : <FormattedMessage id="password_input_show_password" defaultMessage="Show"/> 
                                    }
                                </span>
                                <Icon d={passwordVisible ? Icon.EYE_HIDE : Icon.EYE_SHOW} color={colors.MID_GRAY} />
                            </IconButton>
                        </div>
                    </InputAdornment>
                }
                type={passwordVisible ? 'text' : 'password'}
                {...props}
            />
            <style jsx>{`
                .adornment {
                    display: flex;
                    align-items: center; 
                    margin-right: 18px;
                }

                .adornment :global(button) {
                    display: flex;
                    align-items: center;
                }

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