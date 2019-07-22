import React from 'react'
import {Card} from 'components/molecules'

interface Props {
    children: React.ReactNode
}

const gutter = 15

const CardList = ({
    children
}: Props) => (
        <div className="card-list">
            {children}
            <style jsx>{`
                .card-list {
                    display: flex;
                    flex-wrap: wrap;

                    margin-left: -${gutter}px;
                    margin-right: -${gutter}px;
                }

                .card-list :global(.${Card.classes.root}) {
                    width: calc(25% - ${gutter * 2}px);
                    margin: ${gutter}px;
                }
            `}</style>
        </div>
    )

export default CardList