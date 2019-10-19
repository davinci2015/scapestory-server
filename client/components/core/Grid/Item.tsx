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
                display: flex;
                margin: 0 ${GUTTER}px;
            }

            @media ${media.up('extraSmall')} {
                .item {
                    flex: 0 1 calc(${(extraSmall) / COLUMNS * 100}% - ${GUTTER * 2}px);
                }
            }

            @media ${media.up('small')} {
                .item {
                    flex: 0 1 calc(${(small || extraSmall) / COLUMNS * 100}% - ${GUTTER * 2}px);
                }
            }

            @media ${media.up('medium')} {
                .item {
                    flex: 0 1 calc(${(medium || small || extraSmall) / COLUMNS * 100}% - ${GUTTER * 2}px);
                }
            }

            @media ${media.up('large')} {
                .item {
                    flex: 0 1 calc(${(large || medium || small || extraSmall) / COLUMNS * 100}% - ${GUTTER * 2}px);
                }
            }
        `}</style>
    </>
)

export default Item