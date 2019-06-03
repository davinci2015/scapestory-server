import * as React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Layout from 'components/molecules/Layout'
import Navigation from 'components/molecules/Navigation'
import {withRouter, SingletonRouter} from 'next/router'

const MY_PROFILE = gql`
    query {
      me {
        email
        username
        name
        profileImage
        country
        youtubeLink
        instagramLink
        createdAt
        updatedAt
      }
    }
`

interface Props {
    router: SingletonRouter
}

const Profile = (props: Props) => (
    <Layout>
        <Navigation />
        <h1>Profile page {props.router.query && props.router.query.username}</h1>
        <Query query={MY_PROFILE}>
            {() => {
                return null
            }}
        </Query>
    </Layout>
)

export default withRouter(Profile)