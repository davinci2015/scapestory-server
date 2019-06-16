import React from 'react'

export interface Props extends React.HTMLProps<HTMLInputElement> {
    children?: React.ReactNode
}

const InputAdornment = ({
    children
}: Props) => (
        <div className="adornment">
            {children}
            <style jsx>{`
                .adornment {

                }
            `}</style>
        </div>
    )

export default InputAdornment