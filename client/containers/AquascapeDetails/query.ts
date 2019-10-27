import gql from 'graphql-tag'

export const AQUASCAPE_DETAILS = gql`
    query Aquascape($id: Int!) {
      aquascape(id: $id) {
        id 
        title
        mainImage
        viewsCount
        likesCount
        isLikedByMe
        
        plants {
            id
            name
        }

        livestock {
            id
            name
        }

        hardscape {
            id
            name
        }

        lights {
            id
            brand
            model
        }
            
        filters {
            id
            brand
            model
        }
            
        co2 {
            id
            type
            bps
        }
            
        substrates {
            id
            brand
            name
        }
            
        additives {
            id
            brand
            name
        }

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