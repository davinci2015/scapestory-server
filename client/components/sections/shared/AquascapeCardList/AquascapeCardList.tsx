import React from 'react'
import classnames from 'classnames'

import {FormattedMessage, Headline, Icon} from 'components/atoms'
import {colors, spaces, media} from 'styles'
import {AquascapeCard} from 'components/molecules'

type CardListVariant = 'default' | 'condensed'

interface Props {
    children: React.ReactNode
    title: React.ReactNode
    loadMore?: VoidFunction
    variant?: CardListVariant
}

const AquascapeCardList = ({children, loadMore, title, variant = 'default'}: Props) => (
    <>
        <div
            className={classnames('section', {
                'section--condensed': variant === 'condensed',
            })}
        >
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

            .section--condensed {
                margin: 24px 0;
            }

            @media ${media.up('medium')} {
                .section {
                    margin: ${spaces.s90} 0;
                }

                .section--condensed {
                    margin: 30px 0;
                }
            }

            .section :global(.${AquascapeCard.classes.root}) {
                margin-top: ${spaces.s16};
                margin-bottom: ${spaces.s16};
            }

            .section .title {
                margin-bottom: 40px;
            }

            .section--condensed .title {
                margin-bottom: 14px;
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
