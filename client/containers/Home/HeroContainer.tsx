import * as React from 'react'

import {HeroSection} from 'components/organisms'
import {AquascapeData} from './query'

interface Props {
    featuredAquascape: AquascapeData
}

const HeroContainer = ({featuredAquascape}: Props) => (
    <HeroSection
        title={featuredAquascape.title}
        viewsCount={featuredAquascape.viewsCount}
        likesCount={featuredAquascape.likesCount}
        tags={featuredAquascape.tags}
        username={featuredAquascape.user.username}
        userImage={featuredAquascape.user.profileImage}
        image={featuredAquascape.mainImage}
    />
)

export default HeroContainer