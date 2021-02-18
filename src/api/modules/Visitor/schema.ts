import {gql} from 'graphql-modules'

export default gql`
    type Visitor {
        id: Int!
        visitorId: String!
        aquascapeId: Int!
    }

    type VisitAquascapeResult {
        visitor: Visitor!
        created: Boolean
    }

    extend type Aquascape {
        viewsCount: Int!
    }

    extend type Mutation {
        visitAquascape(aquascapeId: Int!): VisitAquascapeResult!
    }
`
