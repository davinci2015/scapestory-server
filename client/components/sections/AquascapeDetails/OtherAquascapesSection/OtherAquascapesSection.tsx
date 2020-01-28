import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {Grid} from 'components/core'
import {AquascapeCardList} from 'components/sections/shared'
import {renderAquascapeCards} from 'utils/render'
import {AquascapeFieldsFragment} from 'graphql/generated/queries'
import Section from 'components/sections/AquascapeDetails/Section'

interface Props {
    aquascapes: AquascapeFieldsFragment[]
}

const OtherAquascapesSection: React.FunctionComponent<Props> = ({aquascapes}) => (
    <>
        <Section>
            <AquascapeCardList
                title={
                    <Headline as="h3" variant="h4">
                        <FormattedMessage
                            id="aquascape.other_aquascapes.title"
                            defaultMessage="Other aquascapes"
                        />
                    </Headline>
                }
            >
                <Grid.Row>{renderAquascapeCards(aquascapes)}</Grid.Row>
            </AquascapeCardList>
        </Section>
        <style jsx>{``}</style>
    </>
)

export default OtherAquascapesSection
