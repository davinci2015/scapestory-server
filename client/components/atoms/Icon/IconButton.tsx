import React from 'react'

interface Props {
    children: React.ReactNode
    onClick?: (...args: any[]) => void
}

const classes = {
    root: 'icon-button',
}

const IconButton = ({children, onClick}: Props) => (
    <button type="button" className={classes.root} onClick={onClick}>
        {children}

        <style>{`
                .icon-button {
                    cursor: pointer;
                    background: transparent;
                    padding: 0;
                    margin: 0;
                    border: 0;
                    outline: 0; 
                }
            `}</style>
    </button>
)

IconButton.classes = classes

export default IconButton
