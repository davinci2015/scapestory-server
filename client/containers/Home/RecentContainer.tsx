import React from 'react'
import {useQuery} from '@apollo/react-hooks'

import {Grid} from 'components/core'
import {Headline, FormattedMessage} from 'components/atoms'
import {AquascapeCardList} from 'components/sections/shared'

import {renderAquascapeCards} from 'utils/render'
import {AQUASCAPES} from 'graphql/queries'
import {AquascapesQuery} from 'graphql/generated/queries'

const RECENT_AQUASCAPES_LIMIT = 4

const RecentContainer = () => {
    const recent = useQuery<AquascapesQuery>(AQUASCAPES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            pagination: {limit: RECENT_AQUASCAPES_LIMIT},
        },
    })

    if (!recent.data) {
        return null
    }

    return (
        <AquascapeCardList
            title={
                <Headline as="h2" variant="h4">
                    <FormattedMessage id="home_list_title_newest" defaultMessage="Recently added" />
                </Headline>
            }
        >
            <Grid.Row>{renderAquascapeCards(recent.data.aquascapes.rows)}</Grid.Row>
        </AquascapeCardList>
    )
}

export default RecentContainer
