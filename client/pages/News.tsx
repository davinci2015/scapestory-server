import * as React from 'react'
import Link from 'next/link'
import routes from 'routes'
import Navigation from 'components/molecules/Navigation'
import Headline from 'components/atoms/Headline'
import Paragraph from 'components/atoms/Paragraph';
import App from 'components/core/App'
import UserWidget from 'components/atoms/UserWidget';

const Index = () => (
    <App>
        <Navigation/>
        <Headline as="h1">Scapestory</Headline>
        <Headline as="h2">News Page</Headline>
        <Headline as="h3">News Page</Headline>
        <Headline as="h4">News Page</Headline>
        <Headline as="h5">News Page</Headline>
        <Paragraph type="body">Paragraph</Paragraph>
        <Paragraph type="s1">Paragraph</Paragraph>
        <Paragraph type="s2">Paragraph</Paragraph>
        <UserWidget name="John Snow" image="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"/>

        <Link href={routes.signUp}>
            <a>Sign Up</a>
        </Link>
    </App>
)

export default Index