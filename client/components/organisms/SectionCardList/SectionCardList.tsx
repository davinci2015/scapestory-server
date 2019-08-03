import React from 'react'

import CardList from './CardList'
import {FormattedMessage, Headline, Icon} from 'components/atoms'
import {colors, spaces} from 'styles'

interface Props {
    children: React.ReactNode
    title: React.ReactNode
    loadMore?: VoidFunction
}

const SectionCardList = ({
    children,
    title,
    loadMore,
}: Props) => (
        <div className="section-card-list">
            <div className="title">
                {title}
            </div>
            {children}
            {
                loadMore &&
                <div className="load-more">
                    <div className="load-more-button">
                        <Headline as="h5" variant="h5" color={colors.PRIMARY}>
                            <FormattedMessage id="card_list.load_more" defaultMessage="Load more aquascapes" />
                        </Headline>
                        <Icon d={Icon.ARROW_DOWN} color={colors.PRIMARY}/>
                    </div>
                </div>
            }
            <style jsx>{`
                .section-card-list {
                    display: block;
                    margin: 75px 0;
                }

                .section-card-list .title {
                    margin-bottom: 40px;
                }

                .load-more {
                    margin-top: 105px;
                    margin-bottom: 120px;
                    display: flex;
                    justify-content: center;
                }

                .load-more-button {
                    cursor: pointer;
                    display: flex;
                    align-items: center;    
                }

                .load-more-button :global(svg) {
                    margin-left: ${spaces.s12};
                }
            `}</style>
        </div>
    )

SectionCardList.List = CardList

export default SectionCardList