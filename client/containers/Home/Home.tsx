import {useQuery} from 'react-apollo-hooks'

import {Grid, Content} from 'components/core'
import {SectionCardList} from 'components/organisms'
import {Headline, FormattedMessage} from 'components/atoms'

import {QUERY_TRENDING_AND_FEATURED_AQUASCAPES, QUERY_RECENT_AQUASCAPES} from './query'
import HeroContainer from './HeroContainer'
import AquascapeListContainer from './AquascapeListContainer'


const HomeContainer = () => {
    const recent = useQuery(QUERY_RECENT_AQUASCAPES, {
        variables: {
            pagination: {
                limit: 12,
                offset: 0
            }
        }
    })

    const highlighted = useQuery(QUERY_TRENDING_AND_FEATURED_AQUASCAPES, {
        variables: {
            pagination: {
                limit: 8,
                offset: 0
            }
        }
    })

    console.log(recent.data)
    console.log(highlighted.data)

    return (
        <Content>
            <Grid>
                {
                    !highlighted.loading && highlighted.data.featured &&
                    <HeroContainer featuredAquascape={highlighted.data.featured} />
                }

                {
                    !highlighted.loading &&
                    <SectionCardList title={(
                        <Headline as="h2" variant="h4">
                            <FormattedMessage id="home_list_title_trending" defaultMessage="Trending now" />
                        </Headline>
                    )}>
                        <AquascapeListContainer aquascapes={highlighted.data.trending} />
                    </SectionCardList>
                }

                {
                    !recent.loading &&
                    <>
                        <SectionCardList title={(
                            <Headline as="h2" variant="h4">
                                <FormattedMessage id="home_list_title_newest" defaultMessage="Recently added" />
                            </Headline>
                        )}>
                            <AquascapeListContainer aquascapes={recent.data.aquascapes.slice(0, 4)} />
                        </SectionCardList>

                        <SectionCardList
                            loadMore={() => null}
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