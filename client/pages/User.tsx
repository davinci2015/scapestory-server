import * as React from 'react'
import {Query} from 'react-apollo'
import {withRouter, SingletonRouter} from 'next/router'
import gql from 'graphql-tag'

import {Navigation} from 'components/molecules'
import {App} from 'components/core'

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
    <App>
        <Navigation />
        <h1>User page {props.router.query && props.router.query.username}</h1>
        <Query query={MY_PROFILE}>
            {() => {
                return null
            }}
        </Query>
    </App>
)

export default withRouter(Profile)