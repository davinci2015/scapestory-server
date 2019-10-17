import gql from 'graphql-tag'

export const AQUASCAPE_DETAILS = gql`
    query Aquascape($id: Int!) {
      aquascape(id: $id) {
        id 
        title
        mainImage
        viewsCount
        likesCount
        tags {  
            name
        }

        user {
            name
            profileImage
            username
        }
      }
    }
`