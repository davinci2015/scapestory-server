import React from 'react'

import {FormattedMessage, Paragraph, Icon, Tag, IconText, Button} from 'components/atoms'
import {AquascapeData} from 'containers/Home/query'
import {colors, spaces} from 'styles'
import Hero from 'components/sections/Hero'
import {UserWidget} from 'components/molecules'

interface Props {
    aquascape: AquascapeData
}

const HeroSection: React.FunctionComponent<Props> = ({aquascape}) => (
    <>
        <Hero
            variant="cover"
            title={aquascape.title}
            image={aquascape.mainImage}
            topSection={
                <Hero.TopSection>
                    <Hero.TopLeft>
                        <UserWidget
                            size="large"
                            variant="border"
                            image={aquascape.user.profileImage}
                            text={
                                <Paragraph type="body" color={colors.WHITE}>
                                    <FormattedMessage
                                        id="aquascape.hero_section.username"
                                        defaultMessage="by {username}"
                                        values={{username: aquascape.user.name || aquascape.user.username}}
                                    />
                                </Paragraph>
                            }
                        />
                    </Hero.TopLeft>
                    <Hero.TopRight>
                        <Button
                            leftIcon={<Icon d={Icon.HEART_OUTLINE} color={colors.WHITE} />} 
                            dimensions="extraSmall" 
                            color="tertiary">
                            <FormattedMessage id="aquascape.hero_section.like" defaultMessage="Like"/>
                        </Button>
                    </Hero.TopRight>
                </Hero.TopSection>
            }
            bottomSection={
                <Hero.BottomSection>
                    <Hero.BottomLeft>
                        <div className="icons">
                            <IconText icon={Icon.EYE_SHOW_FULL} text={aquascape.viewsCount} color={colors.WHITE} />
                            <IconText icon={Icon.HEART} text={aquascape.likesCount} color={colors.WHITE} />
                        </div>
                    </Hero.BottomLeft>
                    <Hero.BottomRight>
                        {aquascape.tags.map((tag, index) => <Tag key={index} text={tag.name} variant="primary" size="large" />)}
                    </Hero.BottomRight>
                </Hero.BottomSection>
            }
        />

        <style>{`
            .icons {
                margin-left: -${spaces.s12};
            }
        `}</style>
    </>
)

export default HeroSection