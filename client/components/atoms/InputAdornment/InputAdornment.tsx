import React from 'react'
import {zIndex} from 'styles'

export interface Props extends React.HTMLProps<HTMLInputElement> {
    children?: React.ReactNode
}

const classes = {
    root: 'adornment',
}

const InputAdornment = ({children}: Props) => (
    <div className={classes.root}>
        {children}
        <style jsx>{`
            .adornment {
                z-index: ${zIndex.LOW};
                display: flex;
                align-items: center;
            }

            .adornment :global(button) {
                display: flex;
                align-items: center;
            }
        `}</style>
    </div>
)

InputAdornment.classes = classes

export default InputAdornment
