import React from 'react'
import {useQuery} from '@apollo/react-hooks'

import HeroSection from 'components/sections/Home/HeroSection'
import {FEATURED_AQUASCAPE} from 'graphql/queries'
import {FeaturedAquascapesQuery} from 'graphql/generated/queries'
import Section from 'components/sections/Home/Section'

const FeaturedContainer = () => {
    const featured = useQuery<FeaturedAquascapesQuery>(FEATURED_AQUASCAPE)

    if (!featured.data?.featured) {
        return null
    }

    return (
        <Section>
            <HeroSection aquascape={featured.data.featured} />
        </Section>
    )
}

export default FeaturedContainer
