import React from 'react'

type Props = {
    children: React.ReactNode
}

const Grid = ({children}: Props) => (
    <div className="grid">
        {children}
        <style jsx global>{`
            .grid {
                padding-left: 10%;
                padding-right: 10%;
            }
        `}</style>
    </div>
)

export default Grid