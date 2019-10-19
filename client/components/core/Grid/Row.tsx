import React from 'react'
import {GUTTER} from 'components/core/Grid'

const Row: React.FunctionComponent = ({children}) => (
    <>
        <div className="row">
            {children}
        </div>
        <style jsx>{`
            .row {
                display: flex;
                flex-wrap: wrap;

                margin-left: -${GUTTER}px;
                margin-right: -${GUTTER}px;
            }
        `}</style>
    </>
)

export default Row