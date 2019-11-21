import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {Grid} from 'components/core'
import {AquascapeCardList} from 'components/sections/shared'
import {spaces} from 'styles'
import {renderAquascapeCards} from 'utils/render'
import {AquascapeData} from 'graphql/queries'

interface Props {
    aquascapes: AquascapeData[]
}

const OtherAquascapesSection: React.FunctionComponent<Props> = ({
    aquascapes,
}) => (
    <>
        <div className="section">
            <AquascapeCardList
                title={
                    <Headline as="h3" variant="h4">
                        <FormattedMessage
                            id="aquascape.other_aquascapes.title"
                            defaultMessage="Similar aquascapes"
                        />
                    </Headline>
                }
            >
                <Grid.Row>{renderAquascapeCards(aquascapes)}</Grid.Row>
            </AquascapeCardList>
        </div>
        <style jsx>{`
            .section {
                padding-bottom: ${spaces.s120};
            }
        `}</style>
    </>
)

export default OtherAquascapesSection
