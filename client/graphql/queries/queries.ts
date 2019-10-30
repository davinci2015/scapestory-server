import gql from 'graphql-tag'

export interface AquascapeData {
  id: string
  title: string
  slug: string
  mainImage: string
  viewsCount: number
  likesCount: number
  tags: [{
      name: string
  }]
  user: {
      name?: string
      profileImage?: string
      username: string
  }
}

const fragments = {
  aquascape: gql`
      fragment AquascapeFields on Aquascape {
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
  `
}

export const USER_PROFILE = gql`
    query USER_PROFILE {
      me {
        profileImage
      }
    }
`

export const AQUASCAPES = gql`
    query Aquascapes($pagination: Pagination!) {
        aquascapes(pagination: $pagination) {
            ...AquascapeFields
        }
    }
    ${fragments.aquascape}
`

export const FEATURED_AQUASCAPE = gql`
  query FeaturedAquascapes {
      featured: featuredAquascape {
          ...AquascapeFields
      }
  }
  ${fragments.aquascape}
`

export const TRENDING_AQUASCAPES = gql`
  query TrendingAquascapes($pagination: Pagination!) {
      trending: trendingAquascapes(pagination: $pagination) {
          ...AquascapeFields
      }
  }
  ${fragments.aquascape}
`