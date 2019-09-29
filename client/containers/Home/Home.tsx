import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'

import {Grid, Content} from 'components/core'
import {SectionCardList} from 'components/organisms'
import {Headline, FormattedMessage} from 'components/atoms'

import {QUERY_TRENDING_AND_FEATURED_AQUASCAPES, QUERY_RECENT_AQUASCAPES} from './query'
import AquascapeListContainer from './AquascapeListContainer'
import HeroSection from 'components/organisms/Home/HeroSection'

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
            updateQuery: (prev, { fetchMoreResult }) => {
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
                    !highlighted.loading && highlighted.data.featured &&
                    <HeroSection featuredAquascape={highlighted.data.featured} />
                }

                {
                    !highlighted.loading && highlighted.data.trending && 
                    <SectionCardList title={(
                        <Headline as="h2" variant="h4">
                            <FormattedMessage id="home_list_title_trending" defaultMessage="Trending now" />
                        </Headline>
                    )}>
                        <AquascapeListContainer aquascapes={highlighted.data.trending} />
                    </SectionCardList>
                }

                {
                    !recent.loading && recent.data.aquascapes && 
                    <>
                        <SectionCardList title={(
                            <Headline as="h2" variant="h4">
                                <FormattedMessage id="home_list_title_newest" defaultMessage="Recently added" />
                            </Headline>
                        )}>
                            <AquascapeListContainer aquascapes={recent.data.aquascapes.slice(0, 4)} />
                        </SectionCardList>

                        <SectionCardList
                            loadMore={allRecentLoaded ? undefined : loadMore}
                            title={(
                                <Headline as="h2" variant="h4">
                                    <FormattedMessage id="home_list_title_explore" defaultMessage="Explore all aquascapes" />
                                </Headline>
                            )}>
                            <AquascapeListContainer aquascapes={recent.data.aquascapes.slice(4)} />
                        </SectionCardList>
                    </>
                }
            </Grid>
        </Content>
    )
}

export default HomeContainer