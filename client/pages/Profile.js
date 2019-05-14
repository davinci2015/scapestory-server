import * as React from 'react'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

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


const Profile = () => (
    <Layout>
        <Navigation/>
        <h1>Profile page</h1>
        <Query query={MY_PROFILE}>
            {(data) => {
                return null
            }}
        </Query>
    </Layout>
)

export default Profile