import React from 'react'

import {Badge, FormattedMessage, Paragraph, Icon, Tag, IconText} from 'components/atoms'
import {colors, spaces} from 'styles'
import {Hero} from 'components/sections/shared'
import {UserWidget} from 'components/molecules'
import {FeaturedAquascapesQuery} from 'graphql/generated/queries'
import {getUserName} from 'utils/mappers'
import {AquascapeDetailsLink, ProfileLink} from 'components/core'

interface Props {
    aquascape: FeaturedAquascapesQuery['featured']
}

const HeroSection: React.FunctionComponent<Props> = ({aquascape}) => {
    if (!aquascape) return null

    return (
        <>
            <div className="section">
                <AquascapeDetailsLink id={aquascape.id} title={aquascape.title}>
                    <Hero
                        title={aquascape.title}
                        image={aquascape.mainImage}
                        topSection={
                            <Hero.TopSection>
                                <Hero.TopLeft>
                                    <Badge
                                        background="gradient"
                                        icon={<Icon d={Icon.FIRE} color={colors.WHITE} />}
                                    >
                                        <Paragraph type="body" color={colors.WHITE} weight="bold">
                                            <FormattedMessage
                                                id="hero_section.editor_choice"
                                                defaultMessage="Editor's Choice"
                                            />
                                        </Paragraph>
                                    </Badge>
                                </Hero.TopLeft>
                            </Hero.TopSection>
                        }
                        bottomSection={
                            <Hero.BottomSection>
                                <Hero.BottomLeft>
                                    {aquascape.user && (
                                        <ProfileLink slug={aquascape.user.slug}>
                                            <UserWidget
                                                size="large"
                                                variant="border"
                                                image={aquascape.user.profileImage}
                                                text={
                                                    <Paragraph type="body" color={colors.WHITE}>
                                                        <FormattedMessage
                                                            id="hero_section.aquascape_author"
                                                            defaultMessage="by {username}"
                                                            values={{
                                                                username: getUserName(
                                                                    aquascape.user
                                                                ),
                                                            }}
                                                        />
                                                    </Paragraph>
                                                }
                                            />
                                        </ProfileLink>
                                    )}
                                    <IconText
                                        icon={Icon.EYE_SHOW_FULL}
                                        text={aquascape.viewsCount}
                                        color={colors.WHITE}
                                    />
                                    <IconText
                                        icon={Icon.HEART}
                                        text={aquascape.likesCount}
                                        color={colors.WHITE}
                                    />
                                </Hero.BottomLeft>
                                <Hero.BottomRight>
                                    {aquascape.tags.map((tag, index) => (
                                        <Tag
                                            key={index}
                                            text={tag.name}
                                            variant="primary"
                                            size="large"
                                        />
                                    ))}
                                </Hero.BottomRight>
                            </Hero.BottomSection>
                        }
                    />
                </AquascapeDetailsLink>
            </div>

            <style jsx>{`
                .section {
                    padding-top: ${spaces.s60};
                }

                .section a {
                    text-decoration: none;
                }

                .section :global(.${UserWidget.classes.root}) {
                    margin-right: ${spaces.s30};
                }
            `}</style>
        </>
    )
}

export default HeroSection
