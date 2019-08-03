import * as React from 'react'

import {App, Grid} from 'components/core'
import withAuth from 'hocs/withAuth';
import {SectionCardList, HeroSection, Footer} from 'components/organisms'
import {Card} from 'components/molecules'
import NavigationContainer from 'containers/Navigation'
import {Headline, FormattedMessage} from 'components/atoms'

const Index = () => (
    <App>
        <NavigationContainer />
        <Grid>
            <HeroSection
                imageStackText="liked by Ines, Draško and 24 others"
                username="Justin Belieber"
                userImage="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                title="Purple and yellow paradise"
                image="https://www.fishtanksetups.com/wp-content/uploads/2017/06/aquascape-guide.jpg"
            />

            <SectionCardList title={(
                <Headline as="h2" variant="h4">
                    <FormattedMessage id="home_list_title_trending" defaultMessage="Trending now" />
                </Headline>
            )}>
                <SectionCardList.List>
                    {Array(4).fill("").map((_, index) => (
                        <Card
                            key={index}
                            name="by John Snow"
                            title="My awesome aquascape"
                            userImage="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                            image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
                        />
                    ))}
                </SectionCardList.List>
            </SectionCardList>

            <SectionCardList title={(
                <Headline as="h2" variant="h4">
                    <FormattedMessage id="home_list_title_newest" defaultMessage="Recently added" />
                </Headline>
            )}>
                <SectionCardList.List>
                    {Array(4).fill("").map((_, index) => (
                        <Card
                            key={index}
                            name="by John Snow"
                            title="My awesome aquascape"
                            userImage="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                            image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
                        />
                    ))}
                </SectionCardList.List>
            </SectionCardList>

            <SectionCardList
                loadMore={() => null}
                title={(
                    <Headline as="h2" variant="h4">
                        <FormattedMessage id="home_list_title_explore" defaultMessage="Explore all aquascapes" />
                    </Headline>
                )}>
                <SectionCardList.List>
                    {Array(8).fill("").map((_, index) => (
                        <Card
                            key={index}
                            name="by John Snow"
                            title="My awesome aquascape"
                            userImage="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                            image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
                        />
                    ))}
                </SectionCardList.List>
            </SectionCardList>
        </Grid>
        <Footer />
    </App>
)

export default withAuth(Index)