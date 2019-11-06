import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {Grid} from 'components/core'
import {AquascapeCardList} from 'components/sections/shared'
import {renderAquascapeCards} from 'utils/render'
import {AquascapeData} from 'graphql/queries'

interface Props {
    username: string
    aquascapes: AquascapeData[]
}

const UserAquascapesSection: React.FunctionComponent<Props> = ({username, aquascapes}) => (
    <>
        <div className="section">
            <AquascapeCardList title={(
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
            </AquascapeCardList>
        </div>
        <style jsx>{`
            .section {
                padding-bottom: 45px;   
            }
        `}</style>
    </>
)

export default UserAquascapesSection