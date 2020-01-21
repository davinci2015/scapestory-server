import gql from 'graphql-tag'

export const UPDATE_USER_DETAILS = gql`
    mutation UpdateUserDetails($details: UserDetails!) {
        updateUserDetails(details: $details) {
            id
            name
            about
            facebookUrl
            youtubeUrl
            twitterUrl
            instagramUrl
        }
    }
`
