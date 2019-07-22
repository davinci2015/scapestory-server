import * as React from 'react'
import numeral from 'numeral'

import App from 'components/core/App'
import {Tag, IconText, Paragraph, Headline, Icon} from 'components/atoms'
import {Card, UserWidget} from 'components/molecules'
import NavigationContainer from 'containers/Navigation'

const Index = () => (
    <App>
        <NavigationContainer />
        <Headline as="h1">Scapestory</Headline>
        <Headline as="h2">News Page</Headline>
        <Headline as="h3">News Page</Headline>
        <Headline as="h4">News Page</Headline>
        <Headline as="h5">News Page</Headline>

        <Paragraph type="body">Paragraph</Paragraph>
        <Paragraph type="s1">Paragraph</Paragraph>
        <Paragraph type="s2">Paragraph</Paragraph>

        <UserWidget name="John Snow" image="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" />

        <Tag variant="primary" text="TAG" />
        <Tag variant="secondary" text="Loooong tag" />
        <Tag variant="tertiary" text="Tag" />
        <Tag variant="quaternary" text="Tag" />

        <div style={{backgroundColor: 'grey', margin: '20px 0'}}>
            <IconText icon={Icon.HEART} text={numeral(3233).format('0a+')} />
            <IconText icon={Icon.EYE_SHOW_FULL} text="2000" />
        </div>

        <div style={{width: 350, margin: 40}}>
            <Card
                name="by John Snow"
                title="My awesome aquascape"
                userImage="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
            />
        </div>

        <div style={{width: 350, margin: 40}}> 
            <Card
                name="by John Snow"
                title="My awesome aquascape long description below so it doesn't fit at all"
                userImage="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
            />
        </div>

    </App>
)

export default Index