import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {Grid} from 'components/core'
import AquascapeCardListSection from 'components/sections/AquascapeCardList'
import {spaces} from 'styles'
import {renderAquascapeCards} from 'utils/render'
import {AquascapeData} from 'graphql/queries'

interface Props {
    aquascapes: AquascapeData[]
}

const OtherAquascapesSection: React.FunctionComponent<Props> = ({aquascapes}) => (
    <>
        <div className="section">
            <AquascapeCardListSection title={(
                <Headline as="h3" variant="h4">
                    <FormattedMessage
                        id="aquascape.other_aquascapes.title"
                        defaultMessage="Other aquascapes"
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

export default OtherAquascapesSection