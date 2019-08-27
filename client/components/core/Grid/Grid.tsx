import React from 'react'
import {spaces} from 'styles';

type Props = {
    children: React.ReactNode
}

const Grid = ({children}: Props) => (
    <div className="grid">
        {children}
        <style jsx global>{`
            .grid {
                padding-left: ${spaces.s24};
                padding-right: ${spaces.s24};
            }
        `}</style>
    </div>
)

export default Grid