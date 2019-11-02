import React from 'react'

import {zIndex} from 'styles'

const TopSection: React.FunctionComponent = ({children}) => (
    <div className="section">
        {children}
        <style jsx>{`
            .section {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;            

                z-index: ${zIndex.DEFAULT};
            }
        `}</style>
    </div>
)

const TopLeft: React.FunctionComponent = ({children}) => <div>{children}</div>

const TopRight: React.FunctionComponent = ({children}) => <div>{children}</div>

export {
    TopSection,
    TopLeft,
    TopRight
}