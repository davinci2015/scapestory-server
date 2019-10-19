import React from 'react'

import {spaces, zIndex, media} from 'styles'

const TopSection: React.FunctionComponent = ({children}) => (
    <div className="section">
        {children}
        <style jsx>{`
            .section {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: ${spaces.s18};                

                z-index: ${zIndex.DEFAULT};
            }

            @media ${media.up('medium')} {
                .section {
                    padding-top: ${spaces.s30};
                    padding-left: ${spaces.s48};
                }
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