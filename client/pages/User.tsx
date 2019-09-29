import * as React from 'react'
import {Query} from 'react-apollo'
import {useRouter} from 'next/router'
import gql from 'graphql-tag'

import {App} from 'components/core'
import withAuth from 'hocs/withAuth'
import NavigationContainer from 'containers/Navigation'

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


const Profile = () => {
    const router = useRouter()

    return (
        <App>
            <NavigationContainer />
            <h1>User page {router.query && router.query.username}</h1>
            <Query query={MY_PROFILE}>
                {() => {
                    return null
                }}
            </Query>
        </App>
    )
}

export default withAuth(Profile)