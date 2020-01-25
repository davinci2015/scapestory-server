import React from 'react'
import {spaces, media} from 'styles'
import Row from 'components/core/Grid/Row'
import Item from 'components/core/Grid/Item'

export const GRID_WIDTH_DEFAULT = '1470px'
export const GRID_WIDTH_SMALL = '727px'
export const GUTTER = 15
export const COLUMNS = 12

export enum GridWidth {
    DEFAULT,
    SMALL,
}

interface Props {
    width?: GridWidth
}

type GridInterface = React.FunctionComponent<Props> & {
    Item: typeof Item
    Row: typeof Row
}

const gridWidthMapping = {
    [GridWidth.DEFAULT]: GRID_WIDTH_DEFAULT,
    [GridWidth.SMALL]: GRID_WIDTH_SMALL,
}

const Grid: GridInterface = ({children, width = GridWidth.DEFAULT}) => (
    <>
        <div className="grid">{children}</div>
        <style jsx global>{`
            .grid {
                max-width: ${gridWidthMapping[width]};
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
