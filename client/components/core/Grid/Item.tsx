import React from 'react'
import {media} from 'styles'
import {GUTTER} from 'components/core/Grid'
import {COLUMNS} from 'components/core/Grid'

export interface ItemProps {
    extraSmall?: number
    small?: number
    medium?: number
    large?: number
}

const classes = {
    root: 'grid-item',
}

type GridType = React.FunctionComponent<ItemProps> & {
    classes: typeof classes
}

const Item: GridType = ({children, extraSmall = 12, large, medium, small}) => (
    <>
        <div className={classes.root}>{children}</div>
        <style jsx>{`
            .grid-item {
                display: flex;
                flex-direction: column;
                margin: 0 ${GUTTER}px;
            }

            @media ${media.up('extraSmall')} {
                .grid-item {
                    flex: 0 1 calc(${(extraSmall / COLUMNS) * 100}% - ${GUTTER * 2}px);
                }
            }

            @media ${media.up('small')} {
                .grid-item {
                    flex: 0 1 calc(${((small || extraSmall) / COLUMNS) * 100}% - ${GUTTER * 2}px);
                }
            }

            @media ${media.up('medium')} {
                .grid-item {
                    flex: 0 1
                        calc(
                            ${((medium || small || extraSmall) / COLUMNS) * 100}% - ${GUTTER * 2}px
                        );
                }
            }

            @media ${media.up('large')} {
                .grid-item {
                    flex: 0 1
                        calc(
                            ${((large || medium || small || extraSmall) / COLUMNS) * 100}% -
                                ${GUTTER * 2}px
                        );
                }
            }
        `}</style>
    </>
)

Item.classes = classes

export default Item
