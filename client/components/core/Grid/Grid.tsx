import React from 'react'
import {spaces, media} from 'styles'

export const GRID_MAX_WIDTH = '1470px'

const Grid: React.FunctionComponent = ({children}) => (
    <div className="grid">
        {children}
        <style jsx global>{`
            .grid {
                max-width: ${GRID_MAX_WIDTH};
                margin: 0 auto; 
                height: 100%;
                padding-left: ${spaces.s16};
                padding-right: ${spaces.s16};
            }

            @media ${media.up('medium')} {
                .grid {
                    padding-left: ${spaces.s24};
                    padding-right: ${spaces.s24};
                }
            }
        `}</style>
    </div>
)

export default Grid