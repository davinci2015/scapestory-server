import React from 'react'
import {useQuery} from '@apollo/react-hooks'

import {Grid} from 'components/core'
import {Headline, FormattedMessage} from 'components/atoms'
import {AquascapeCardList} from 'components/sections/shared'

import {renderAquascapeCards} from 'utils/render'
import {AQUASCAPES} from 'graphql/queries'
import {AquascapesQuery} from 'graphql/generated/queries'
import Section from 'components/sections/Home/Section'

const RECENT_AQUASCAPES_PER_LOAD = 12
const RECENT_AQUASCAPES_LIMIT = 12
const INITIAL_OFFSET = 4

const ExploreContainer = () => {
    const recent = useQuery<AquascapesQuery>(AQUASCAPES, {
        fetchPolicy: 'network-only',
        variables: {
            pagination: {limit: RECENT_AQUASCAPES_LIMIT, offset: INITIAL_OFFSET},
        },
    })

    const loadMore = () => {
        recent.fetchMore({
            variables: {
                pagination: {
                    limit: RECENT_AQUASCAPES_PER_LOAD,
                    offset: INITIAL_OFFSET + (recent.data?.aquascapes.rows.length || 0),
                },
            },
            updateQuery: (prev, options) => {
                if (!options.fetchMoreResult) return prev

                return {
                    aquascapes: {
                        count: options.fetchMoreResult.aquascapes.count,
                        rows: [...prev.aquascapes.rows, ...options.fetchMoreResult.aquascapes.rows],
                        __typename: prev.aquascapes.__typename,
                    },
                }
            },
        })
    }

    if (!recent.data) {
        return null
    }

    const canLoadMore = Boolean(
        recent.data.aquascapes.rows.length < recent.data.aquascapes.count - INITIAL_OFFSET
    )

    return (
        <Section>
            <AquascapeCardList
                loadMore={canLoadMore ? loadMore : undefined}
                title={
                    <Headline as="h2" variant="h4">
                        <FormattedMessage
                            id="home_list_title_explore"
                            defaultMessage="Explore all aquascapes"
                        />
                    </Headline>
                }
            >
                <Grid.Row>{renderAquascapeCards(recent.data.aquascapes.rows)}</Grid.Row>
            </AquascapeCardList>
        </Section>
    )
}

export default ExploreContainer
