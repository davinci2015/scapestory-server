import React from 'react'

import {FormattedMessage, Headline, Icon} from 'components/atoms'
import {colors, spaces, media} from 'styles'
import {AquascapeCard} from 'components/molecules'

interface Props {
    children: React.ReactNode
    title: React.ReactNode
    loadMore?: VoidFunction
}

const AquascapeCardList = ({children, title, loadMore}: Props) => (
    <>
        <div className="section">
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
            .section {
                display: block;
                margin: 36px 0;
            }

            @media ${media.up('medium')} {
                .section {
                    margin: 75px 0;
                }
            }

            .section :global(.${AquascapeCard.classes.root}) {
                margin-top: ${spaces.s16};
                margin-bottom: ${spaces.s16};
            }

            .title {
                margin-bottom: 40px;
            }

            .load-more {
                margin-top: 36px;
                margin-bottom: 62px;
                display: flex;
                justify-content: center;
            }

            @media ${media.up('medium')} {
                .load-more {
                    margin-top: 105px;
                    margin-bottom: 120px;
                }
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
    </>
)

export default AquascapeCardList
