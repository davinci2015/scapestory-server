import {gql} from 'graphql-modules'

export default gql`
    type Brand {
        id: Int!
        predefined: Boolean!
        name: String!
        logo: String
        address: String
    }

    extend type Filter {
        brand: Brand
    }

    extend type Substrate {
        brand: Brand
    }

    extend type Additive {
        brand: Brand
    }

    extend type Light {
        brand: Brand
    }

    extend interface Equipment {
        brand: Brand
    }

    extend type Query {
        brands: [Brand!]!
    }
`
