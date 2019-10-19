import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'

import {Grid, Content} from 'components/core'
import {Headline, FormattedMessage} from 'components/atoms'
import AquascapeCardList from 'components/sections/AquascapeCardList'

import {QUERY_TRENDING_AND_FEATURED_AQUASCAPES, QUERY_RECENT_AQUASCAPES} from './query'
import HeroSection from 'components/sections/Home/HeroSection'
import {renderAquascapeCards} from 'utils/render'

const HomeContainer = () => {
    const itemsPerLoad = 4
    const recentInitialLimit = 12
    const [allRecentLoaded, setAllRecentLoaded] = useState(false)
    const [recentVisible, setRecentVisible] = useState(recentInitialLimit)

    const recent = useQuery(QUERY_RECENT_AQUASCAPES, {
        variables: {
            pagination: {
                limit: recentInitialLimit,
                offset: 0
            }
        }
    })

    const highlighted = useQuery(QUERY_TRENDING_AND_FEATURED_AQUASCAPES, {
        variables: {
            pagination: {
                limit: itemsPerLoad * 2,
                offset: 0
            }
        }
    })

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
                    !highlighted.loading && highlighted.data && highlighted.data.featured &&
                    <HeroSection aquascape={highlighted.data.featured} />
                }

                {
                    !highlighted.loading && highlighted.data && highlighted.data.trending &&
                    <AquascapeCardList title={(
                        <Headline as="h2" variant="h4">
                            <FormattedMessage id="home_list_title_trending" defaultMessage="Trending now" />
                        </Headline>
                    )}>
                        <Grid.Row>
                            {renderAquascapeCards(highlighted.data.trending)}
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