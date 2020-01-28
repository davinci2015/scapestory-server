import React from 'react'

import {AquascapeCardList} from 'components/sections/shared'
import {Headline, FormattedMessage} from 'components/atoms'
import {spaces, media} from 'styles'

interface Props {
    name: string
}

const AquascapesSection: React.FunctionComponent<Props> = ({children, name}) => {
    return (
        <>
            <div className="aquascapes-section">
                <AquascapeCardList
                    title={
                        <Headline as="h2" variant="h5">
                            <FormattedMessage
                                id="home_list_title_explore"
                                defaultMessage="{name}'s aquascapes"
                                values={{name}}
                            />
                        </Headline>
                    }
                >
                    {children}
                </AquascapeCardList>
            </div>
            <style jsx>{`
                .aquascapes-section {
                    margin-bottom: ${spaces.s90};
                }

                .aquascapes-section :global(.${AquascapeCardList.classes.title}) {
                    margin-bottom: ${spaces.s12};
                }

                @media ${media.up('medium')} {
                    .aquascapes-section {
                        margin-bottom: ${spaces.s120};
                    }
                }
            `}</style>
        </>
    )
}

export default AquascapesSection
