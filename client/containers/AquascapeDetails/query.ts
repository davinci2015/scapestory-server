import gql from 'graphql-tag'
import {fragments} from 'graphql/queries'

export const AQUASCAPE_DETAILS = gql`
    query Aquascape($id: Int!) {
      aquascapes(pagination: {limit: 4, offset: 0}, random: true) {
        ...AquascapeFields
      }

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
            id
            name
            profileImage
            username
        }
      }
    }
    ${fragments.aquascape}
`