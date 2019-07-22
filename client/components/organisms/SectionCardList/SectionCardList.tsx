import React from 'react'
import {Headline} from 'components/atoms'

import CardList from './CardList'

interface Props {
    children: React.ReactNode
}

const SectionCardList = ({
    children
}: Props) => (
        <div className="section-card-list">
            {children}
            <style jsx>{`
                .section-card-list {
                    display: block;
                    margin: 75px 0;
                }

                .section-card-list :global(.${Headline.classes.root}) {
                    margin-bottom: 40px;
                }
            `}</style>
        </div>
    )

SectionCardList.List = CardList

export default SectionCardList