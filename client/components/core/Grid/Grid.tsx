import React from 'react'
import {spaces, media} from 'styles'
import Row from 'components/core/Grid/Row'
import Item, {ItemProps} from 'components/core/Grid/Item'

export const GRID_MAX_WIDTH = '1470px'
export const GUTTER = 15
export const COLUMNS = 12

type GridInterface = React.FunctionComponent & {
    Item: React.FunctionComponent<ItemProps>
    Row: React.FunctionComponent
}

const Grid: GridInterface = ({children}) => (
    <>
        <div className="grid">
            {children}
        </div>
        <style jsx global>{`
            .grid {
                max-width: ${GRID_MAX_WIDTH};
                margin: 0 auto; 
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
    </>
)

Grid.Item = Item
Grid.Row = Row

export default Grid