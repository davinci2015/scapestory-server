import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'

import {Grid, Content} from 'components/core'
import {Headline, FormattedMessage} from 'components/atoms'
import AquascapeCardList from 'components/sections/AquascapeCardList'

import HeroSection from 'components/sections/Home/HeroSection'
import {renderAquascapeCards} from 'utils/render'
import {AQUASCAPES, TRENDING_AQUASCAPES, FEATURED_AQUASCAPE} from 'graphql/queries'

const HomeContainer = () => {
    const itemsPerLoad = 4
    const recentInitialLimit = 12
    const [allRecentLoaded, setAllRecentLoaded] = useState(false)
    const [recentVisible, setRecentVisible] = useState(recentInitialLimit)

    const recent = useQuery(AQUASCAPES, {
        variables: {
            pagination: {
                limit: recentInitialLimit,
                offset: 0
            }
        }
    })

    const trending = useQuery(TRENDING_AQUASCAPES, {
        variables: {
            pagination: {
                limit: itemsPerLoad * 2,
                offset: 0
            }
        }
    })

    const featured = useQuery(FEATURED_AQUASCAPE)

    const loadMore = () => {
        setRecentVisible(recentVisible + itemsPerLoad)
        recent.fetchMore({
            variables: {
                pagination: {
                    limit: itemsPerLoad,
                    offset: recentVisible
                }
            },
            updateQuery: (prev, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prev
                if (fetchMoreResult.aquascapes.length < itemsPerLoad) setAllRecentLoaded(true)

                return {aquascapes: [...prev.aquascapes, ...fetchMoreResult.aquascapes]}
            }
        })
    }

    return (
        <Content>
            <Grid>
                {
                    !featured.loading && featured.data && featured.data.featured &&
                    <HeroSection aquascape={featured.data.featured} />
                }

                {
                    !trending.loading && trending.data && trending.data.trending &&
                    <AquascapeCardList title={(
                        <Headline as="h2" variant="h4">
                            <FormattedMessage id="home_list_title_trending" defaultMessage="Trending now" />
                        </Headline>
                    )}>
                        <Grid.Row>
                            {renderAquascapeCards(trending.data.trending)}
                        </Grid.Row>
                    </AquascapeCardList>
                }

                {
                    !recent.loading && recent.data && recent.data.aquascapes &&
                    <>
                        <AquascapeCardList title={(
                            <Headline as="h2" variant="h4">
                                <FormattedMessage id="home_list_title_newest" defaultMessage="Recently added" />
                            </Headline>
                        )}>
                            <Grid.Row>
                                {renderAquascapeCards(recent.data.aquascapes.slice(0, 4))}
                            </Grid.Row>
                        </AquascapeCardList>

                        <AquascapeCardList
                            loadMore={allRecentLoaded ? undefined : loadMore}
                            title={(
                                <Headline as="h2" variant="h4">
                                    <FormattedMessage id="home_list_title_explore" defaultMessage="Explore all aquascapes" />
                                </Headline>
                            )}>
                            <Grid.Row>
                                {renderAquascapeCards(recent.data.aquascapes.slice(4))}
                            </Grid.Row>
                        </AquascapeCardList>
                    </>
                }
            </Grid>
        </Content>
    )
}

export default HomeContainer