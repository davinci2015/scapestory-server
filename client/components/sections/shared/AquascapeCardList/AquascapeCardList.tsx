import React from 'react'

import {FormattedMessage, Headline, Icon} from 'components/atoms'
import {colors, spaces, media} from 'styles'
import {AquascapeCard} from 'components/molecules'

interface Props {
    children: React.ReactNode
    title: React.ReactNode
    loadMore?: VoidFunction
}

const AquascapeCardList = ({children, loadMore, title}: Props) => (
    <>
        <div className="card-section">
            <div className="title">{title}</div>
            {children}
            {loadMore && (
                <div className="load-more" onClick={loadMore}>
                    <div className="load-more-button">
                        <Headline as="h5" variant="h5" color={colors.PRIMARY}>
                            <FormattedMessage
                                id="card_list.load_more"
                                defaultMessage="Load more aquascapes"
                            />
                        </Headline>
                        <Icon d={Icon.ARROW_DOWN} color={colors.PRIMARY} />
                    </div>
                </div>
            )}
        </div>
        <style jsx>{`
            .card-section :global(.${AquascapeCard.classes.root}) {
                margin: ${spaces.s16} 0;
            }

            .card-section .title {
                margin-bottom: ${spaces.s48};
            }

            .load-more {
                margin-top: ${spaces.s60};
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

            @media ${media.up('medium')} {
                .load-more {
                    margin-top: ${spaces.s90};
                }
            }
        `}</style>
    </>
)

export default AquascapeCardList
