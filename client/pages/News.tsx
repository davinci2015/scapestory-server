import * as React from 'react'
import Link from 'next/link'
import routes from 'routes'
import Layout from 'components/molecules/Layout'
import Navigation from 'components/molecules/Navigation'
import Headline from 'components/atoms/Headline'
import Paragraph from 'components/atoms/Paragraph';

const Index = () => (
    <Layout>
        <Navigation/>
        <Headline as="h1">Scapestory</Headline>
        <Headline as="h2">News Page</Headline>
        <Headline as="h3">News Page</Headline>
        <Headline as="h4">News Page</Headline>
        <Headline as="h5">News Page</Headline>
        <Paragraph size="body">Paragraph</Paragraph>
        <Paragraph size="s">Paragraph</Paragraph>
        <Paragraph size="xs">Paragraph</Paragraph>

        <Link href={routes.signUp}>
            <a>Sign Up</a>
        </Link>
        <br/>
        <Link href={routes.login}>
            <a>Login</a>
        </Link>
    </Layout>
)

export default Index