import React from 'react'
import {spaces, media} from 'styles'

export const GRID_MAX_WIDTH = '1470px'
const GUTTER = 15
const COLUMNS = 12

interface ItemProps {
    extraSmall?: number
    small?: number
    medium?: number
    large?: number
}

type GridInterface = React.FunctionComponent & {
    Item: React.FunctionComponent<ItemProps>
    Row: React.FunctionComponent
}

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

const Item: React.FunctionComponent<ItemProps> = ({
    children, 
    extraSmall = 12,
    small,
    medium,
    large
}) => (
    <>
        <div className="item">
            {children}
        </div>
        <style jsx>{`
            .item {
                margin: 0 ${GUTTER}px;
            }

            @media ${media.up('extraSmall')} {
                .item {
                    width: calc(${(extraSmall) / COLUMNS * 100}% - ${GUTTER * 2}px);
                }
            }

            @media ${media.up('small')} {
                .item {
                    width: calc(${(small || extraSmall ) / COLUMNS * 100}% - ${GUTTER * 2}px);
                }
            }

            @media ${media.up('medium')} {
                .item {
                    width: calc(${(medium || small || extraSmall) / COLUMNS * 100}% - ${GUTTER * 2}px);
                }
            }

            @media ${media.up('large')} {
                .item {
                    width: calc(${(large || medium || small || extraSmall) / COLUMNS * 100}% - ${GUTTER * 2}px);
                }
            }
        `}</style>
    </>
)

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