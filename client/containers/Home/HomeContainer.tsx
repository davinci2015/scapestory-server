import React from 'react'
import {useQuery} from '@apollo/react-hooks'

import {Grid, Content} from 'components/core'
import {Headline, FormattedMessage} from 'components/atoms'
import {AquascapeCardList} from 'components/sections/shared'

import HeroSection from 'components/sections/Home/HeroSection'
import {renderAquascapeCards} from 'utils/render'
import {TRENDING_AQUASCAPES, FEATURED_AQUASCAPE} from 'graphql/queries'
import {TrendingAquascapesQuery, FeaturedAquascapesQuery} from 'graphql/generated/queries'
import ExploreContainer from './ExploreContainer'
import RecentContainer from './RecentContainer'

const TRENDING_AQUASCAPES_LIMIT = 8

const HomeContainer = () => {
    const trending = useQuery<TrendingAquascapesQuery>(TRENDING_AQUASCAPES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            pagination: {limit: TRENDING_AQUASCAPES_LIMIT},
        },
    })

    const featured = useQuery<FeaturedAquascapesQuery>(FEATURED_AQUASCAPE)

    return (
        <Content>
            <Grid>
                {!featured.loading && featured?.data?.featured && (
                    <HeroSection aquascape={featured.data.featured} />
                )}

                {!trending.loading && trending?.data?.trending && (
                    <AquascapeCardList
                        title={
                            <Headline as="h2" variant="h4">
                                <FormattedMessage
                                    id="home_list_title_trending"
                                    defaultMessage="Trending now"
                                />
                            </Headline>
                        }
                    >
                        <Grid.Row>{renderAquascapeCards(trending.data.trending)}</Grid.Row>
                    </AquascapeCardList>
                )}

                <RecentContainer />
                <ExploreContainer />
            </Grid>
        </Content>
    )
}

export default HomeContainer
