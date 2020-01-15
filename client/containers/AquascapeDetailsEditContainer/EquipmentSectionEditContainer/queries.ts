import gql from 'graphql-tag'

export const FILTERS = gql`
    query Filters {
        filters {
            id
            model
            brand {
                id
                name
            }
        }
    }
`

export const LIGHTS = gql`
    query Lights {
        lights {
            id
            model
            brand {
                id
                name
            }
        }
    }
`

export const SUBSTRATES = gql`
    query Substrates {
        substrates {
            id
            model
            brand {
                id
                name
            }
        }
    }
`

export const ADDITIVES = gql`
    query Additives {
        additives {
            id
            model
            brand {
                id
                name
            }
        }
    }
`
