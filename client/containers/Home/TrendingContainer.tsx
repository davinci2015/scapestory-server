import React from 'react'
import {useQuery} from '@apollo/react-hooks'

import {Grid} from 'components/core'
import {Headline, FormattedMessage} from 'components/atoms'
import {AquascapeCardList} from 'components/sections/shared'

import {renderAquascapeCards} from 'utils/render'
import {TRENDING_AQUASCAPES} from 'graphql/queries'
import {TrendingAquascapesQuery} from 'graphql/generated/queries'
import Section from 'components/sections/Home/Section'

const TRENDING_AQUASCAPES_LIMIT = 8

const TrendingContainer = () => {
    const trending = useQuery<TrendingAquascapesQuery>(TRENDING_AQUASCAPES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            pagination: {limit: TRENDING_AQUASCAPES_LIMIT},
        },
    })

    if (!trending.data?.trending) {
        return null
    }

    return (
        <Section>
            <AquascapeCardList
                title={
                    <Headline as="h2" variant="h4">
                        <FormattedMessage
                            id="home.section_title.trending"
                            defaultMessage="Trending now"
                        />
                    </Headline>
                }
            >
                <Grid.Row>{renderAquascapeCards(trending.data.trending)}</Grid.Row>
            </AquascapeCardList>
        </Section>
    )
}

export default TrendingContainer
