import React from 'react'

import {Badge, FormattedMessage, Paragraph, Icon} from 'components/atoms'
import {AquascapeData} from 'containers/Home/query'
import {colors, spaces} from 'styles'
import Hero from 'components/organisms/Hero'

interface Props {
    featuredAquascape: AquascapeData
}

const HeroSection = ({featuredAquascape}: Props) => (
    <>
        <div className="section">
            <Hero
                title={featuredAquascape.title}
                viewsCount={featuredAquascape.viewsCount}
                likesCount={featuredAquascape.likesCount}
                tags={featuredAquascape.tags}
                username={featuredAquascape.user.username}
                userImage={featuredAquascape.user.profileImage}
                image={featuredAquascape.mainImage}
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