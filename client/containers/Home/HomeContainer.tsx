import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/react-hooks'

import {Grid, Content} from 'components/core'
import {Headline, FormattedMessage} from 'components/atoms'
import {AquascapeCardList} from 'components/sections/shared'

import HeroSection from 'components/sections/Home/HeroSection'
import {renderAquascapeCards} from 'utils/render'
import {AQUASCAPES, TRENDING_AQUASCAPES, FEATURED_AQUASCAPE} from 'graphql/queries'
import {
    AquascapesQuery,
    TrendingAquascapesQuery,
    FeaturedAquascapesQuery,
} from 'graphql/generated/queries'

const RECENT_AQUASCAPES_PER_LOAD = 12
const RECENT_AQUASCAPES_LIMIT = 12
const TRENDING_AQUASCAPES_LIMIT = 8

const HomeContainer = () => {
    const [allRecentLoaded, setAllRecentLoaded] = useState(false)

    const recent = useQuery<AquascapesQuery>(AQUASCAPES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            pagination: {limit: RECENT_AQUASCAPES_LIMIT, cursor: null},
        },
    })

    const trending = useQuery<TrendingAquascapesQuery>(TRENDING_AQUASCAPES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            pagination: {limit: TRENDING_AQUASCAPES_LIMIT},
        },
    })

    const featured = useQuery<FeaturedAquascapesQuery>(FEATURED_AQUASCAPE)

    const loadMore = () => {
        recent.fetchMore({
            variables: {
                pagination: {
                    limit: RECENT_AQUASCAPES_PER_LOAD,
                    cursor:
                        recent?.data?.aquascapes.rows[recent.data.aquascapes.rows.length - 1]
                            ?.createdAt,
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

    useEffect(() => {
        if (recent && recent.data) {
            if (recent.data.aquascapes.count === recent.data.aquascapes.rows.length) {
                setAllRecentLoaded(true)
            }
        }
    }, [recent])

    return (
        <Content>
            <Grid>
                {!featured.loading && featured.data && featured.data.featured && (
                    <HeroSection aquascape={featured.data.featured} />
                )}

                {!trending.loading && trending.data && trending.data.trending && (
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

                {!recent.loading && recent.data && recent.data.aquascapes.rows && (
                    <>
                        <AquascapeCardList
                            title={
                                <Headline as="h2" variant="h4">
                                    <FormattedMessage
                                        id="home_list_title_newest"
                                        defaultMessage="Recently added"
                                    />
                                </Headline>
                            }
                        >
                            <Grid.Row>
                                {renderAquascapeCards(recent.data.aquascapes.rows.slice(0, 4))}
                            </Grid.Row>
                        </AquascapeCardList>

                        <AquascapeCardList
                            loadMore={allRecentLoaded ? undefined : loadMore}
                            title={
                                <Headline as="h2" variant="h4">
                                    <FormattedMessage
                                        id="home_list_title_explore"
                                        defaultMessage="Explore all aquascapes"
                                    />
                                </Headline>
                            }
                        >
                            <Grid.Row>
                                {renderAquascapeCards(recent.data.aquascapes.rows.slice(4))}
                            </Grid.Row>
                        </AquascapeCardList>
                    </>
                )}
            </Grid>
        </Content>
    )
}

export default HomeContainer
