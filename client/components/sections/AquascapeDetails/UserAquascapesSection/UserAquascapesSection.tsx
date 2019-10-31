import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {Grid} from 'components/core'
import AquascapeCardListSection from 'components/sections/AquascapeCardList'
import {spaces} from 'styles'
import {renderAquascapeCards} from 'utils/render'
import {AquascapeData} from 'graphql/queries'

interface Props {
    username: string
    aquascapes: AquascapeData[]
}

const UserAquascapesSection: React.FunctionComponent<Props> = ({username, aquascapes}) => (
    <>
        <div className="section">
            <AquascapeCardListSection title={(
                <Headline as="h2" variant="h3">
                    <FormattedMessage
                        id="aquascape.user_aquascapes.title"
                        defaultMessage="{username}'s aquascapes"
                        values={{username}}
                    />
                </Headline>
            )}>
                <Grid.Row>
                    {renderAquascapeCards(aquascapes)}
                </Grid.Row>
            </AquascapeCardListSection>
        </div>
        <style jsx>{`
            .section {
                padding-bottom: ${spaces.s120}
            }
        `}</style>
    </>
)

export default UserAquascapesSection