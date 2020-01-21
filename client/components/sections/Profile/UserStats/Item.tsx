import React from 'react'

import {typography} from 'styles'
import {Paragraph} from 'components/atoms'

interface Props {
    title: React.ReactNode
    value: React.ReactNode
}

export type ItemType = React.FunctionComponent<Props>

const Item: ItemType = ({title, value}) => (
    <>
        <div className="item">
            <Paragraph as="p" weight="semibold">
                {title}
            </Paragraph>
            <div className="item-number">
                <Paragraph as="span" weight="bold">
                    {value}
                </Paragraph>
            </div>
        </div>

        <style jsx>{`
            .item {
                display: flex;
                flex-direction: column;
                flex-basis: 30%;
            }

            .item-number :global(.${Paragraph.classes.root}) {
                font-size: ${typography.fontSize.fs20};
            }
        `}</style>
    </>
)

export default Item
