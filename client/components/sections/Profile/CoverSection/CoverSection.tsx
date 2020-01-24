import React from 'react'

import {Hero} from 'components/sections/shared'

interface Props {
    actionButtons?: React.ReactNode
    coverImage?: string | null
}

const CoverSection: React.FunctionComponent<Props> = ({actionButtons, coverImage}) => (
    <Hero
        image={coverImage}
        variant="cover"
        height="compact"
        topSection={
            <Hero.TopSection>
                <Hero.TopLeft></Hero.TopLeft>
                <Hero.TopRight>
                    <Hero.ActionButtons>{actionButtons}</Hero.ActionButtons>
                </Hero.TopRight>
            </Hero.TopSection>
        }
    />
)

export default CoverSection
