import gql from 'graphql-tag'

export const USER_PROFILE = gql`
    query USER_PROFILE {
      me {
        profileImage
      }
    }
`
