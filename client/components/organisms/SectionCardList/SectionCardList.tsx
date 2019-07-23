import React from 'react'

import CardList from './CardList'

interface Props {
    children: React.ReactNode
    title: React.ReactNode
}

const SectionCardList = ({
    children,
    title,
}: Props) => (
        <div className="section-card-list">
            <div className="title">
                {title}
            </div>
            {children}
            <style jsx>{`
                .section-card-list {
                    display: block;
                    margin: 75px 0;
                }

                .section-card-list .title {
                    margin-bottom: 40px;
                }
            `}</style>
        </div>
    )

SectionCardList.List = CardList

export default SectionCardList