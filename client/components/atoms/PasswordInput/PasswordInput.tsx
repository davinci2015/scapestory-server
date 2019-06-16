import React, {useState} from 'react'
import {InputProps} from 'components/atoms/Input'
import {Input, Icon, InputAdornment, IconButton} from 'components/atoms'
import {colors, typography, zIndex} from 'styles'

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
                                    {passwordVisible ? 'Hide' : 'Show'}
                                </span>
                                <Icon d={passwordVisible ? Icon.EYE_SHOW : Icon.EYE_HIDE} color={colors.MID_GRAY} />
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
                    z-index: ${zIndex.LOW};
                }

                .adornment :global(button) {
                    display: flex;
                    align-items: center;
                }

                .text {
                    font-size: ${typography.fontSize.XS};
                    text-transform: uppercase;
                    color: ${colors.MID_GRAY};
                    margin-right: 8px;
                }    
            `}</style>
        </>
    )
}

export default PasswordInput