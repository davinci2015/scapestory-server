import React from 'react'
import {zIndex, spaces} from 'styles'

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
                    display: flex;
                    align-items: center; 
                    margin-right: ${spaces.s18};
                }

                .adornment :global(button) {
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </div>
    )

export default InputAdornment