import gql from 'graphql-tag'

export const USER_PROFILE_IMAGE = gql`
    query {
      me {
        profileImage
      }
    }
`
