import React from 'react'

type Props = {
    children: React.ReactNode
}

const Grid = ({children}: Props) => (
    <div className="grid">
        {children}
        <style jsx global>{`
            .grid {
                padding-left: 225px;
                padding-right: 225px;
            }
        `}</style>
    </div>
)

export default Grid