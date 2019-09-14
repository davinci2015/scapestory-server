import * as React from 'react'

import {HeroSection} from 'components/organisms'

const HeroContainer = ({featuredAquascape}: any) => (
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