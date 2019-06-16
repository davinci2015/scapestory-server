import React from 'react'
import {zIndex} from 'styles'

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
                    z-index: ${zIndex.LOW};
                }
            `}</style>
        </div>
    )

export default InputAdornment