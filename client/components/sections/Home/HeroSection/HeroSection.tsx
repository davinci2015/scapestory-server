import React from 'react'

import {Badge, FormattedMessage, Paragraph, Icon} from 'components/atoms'
import {AquascapeData} from 'containers/Home/query'
import {colors, spaces} from 'styles'
import Hero from 'components/sections/Hero'

interface Props {
    aquascape: AquascapeData
}

const HeroSection = ({aquascape}: Props) => (
    <>
        <div className="section">
            <Hero
                title={aquascape.title}
                viewsCount={aquascape.viewsCount}
                likesCount={aquascape.likesCount}
                tags={aquascape.tags}
                username={aquascape.user.username}
                userImage={aquascape.user.profileImage}
                image={aquascape.mainImage}
                topSection={
                    <Badge background="gradient" icon={<Icon d={Icon.FIRE} color={colors.WHITE} />}>
                        <Paragraph type="body" color={colors.WHITE} weight="bold">
                            <FormattedMessage id="hero_section.editor_choice" defaultMessage="Editor's Choice" />
                        </Paragraph>
                    </Badge>
                }
            />
        </div>
        <style jsx>{`
            .section {
                padding-top: ${spaces.s60};
            }  
        `}</style>
    </>
)

export default HeroSection