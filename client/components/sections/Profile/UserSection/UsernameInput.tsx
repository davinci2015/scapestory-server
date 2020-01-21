import React, {ChangeEvent} from 'react'
import {colors, typography} from 'styles'

interface Props {
    username: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}

const UsernameInput: React.FunctionComponent<Props> = ({onChange, placeholder, username}) => (
    <>
        <input
            className="username-input"
            onChange={onChange}
            defaultValue={username}
            maxLength={40}
            placeholder={placeholder}
        />
        <style jsx>{`
            .username-input {
                position: relative;
                width: 60%;
                padding-top: 2px;

                color: ${colors.WHITE};
                font-size: ${typography.fontSize.fs28};
                font-weight: ${typography.fontWeight.extraBold};
                font-family: ${typography.fontFamily.PRIMARY};

                background: transparent;
                border: none;
                outline: 0;
                border-bottom: 2px solid ${colors.SHADE_EXTRA_LIGHT};
            }
        `}</style>
    </>
)

export default UsernameInput
