import React from 'react'

import {spaces} from 'styles'
import {Tag, IconText} from 'components/atoms'

const BottomSection: React.FunctionComponent = ({children}) => (
    <div className="section">
        {children}
        <style jsx>{`
            .section {
                display: flex;
                width: 100%;
                justify-content: space-between;
            }

            .section :global(.${Tag.classes.root}) {
                margin-left: ${spaces.s6};
                margin-right: ${spaces.s6};
            }

            .section :global(.${IconText.classes.root}) {
                margin-left: ${spaces.s12};
                margin-right: ${spaces.s12};
            }
        `}</style>
    </div>
)

const BottomLeft: React.FunctionComponent = ({children}) => (
    <div className="left">
        {children}
        <style jsx>{`
            .left {
                display: flex;
                align-items: center;
            }
        `}</style>
    </div>
)

const BottomRight: React.FunctionComponent = ({children}) => (
    <div>{children}</div>
)

export {BottomSection, BottomLeft, BottomRight}
