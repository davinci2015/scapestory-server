import React from 'react'

import {
    FormattedMessage,
    Paragraph,
    Icon,
    Tag,
    IconText,
    Button,
    IconButton,
} from 'components/atoms'
import {colors, spaces} from 'styles'
import {Hero} from 'components/sections/shared'
import {UserWidget} from 'components/molecules'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {getUserName} from 'utils/mappers'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
    toggleLike: () => void
    toggleFollow: () => void
}

const HeroSection: React.FunctionComponent<Props> = ({aquascape, toggleLike, toggleFollow}) => {
    console.log(aquascape?.user)
    if (!aquascape) return null

    return (
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
                                image={aquascape.user?.profileImage}
                                text={
                                    <div>
                                        <Paragraph type="body" color={colors.WHITE} weight="bold">
                                            <FormattedMessage
                                                id="aquascape.hero_section.username"
                                                defaultMessage="by {username}"
                                                values={{username: getUserName(aquascape.user)}}
                                            />
                                        </Paragraph>
                                        <div
                                            className="follow"
                                            onClick={toggleFollow}
                                            role="presentation"
                                        >
                                            <Paragraph
                                                type="s2"
                                                color={colors.WHITE}
                                                weight="semibold"
                                            >
                                                {aquascape.user?.isFollowedByMe ? (
                                                    <FormattedMessage
                                                        id="aquascape.hero_section.unfollow"
                                                        defaultMessage="Unfollow"
                                                    />
                                                ) : (
                                                    <FormattedMessage
                                                        id="aquascape.hero_section.follow"
                                                        defaultMessage="Follow"
                                                    />
                                                )}
                                            </Paragraph>
                                        </div>
                                    </div>
                                }
                            />
                        </Hero.TopLeft>
                        <Hero.TopRight>
                            <Button
                                onClick={toggleLike}
                                leftIcon={
                                    <Icon
                                        d={aquascape.isLikedByMe ? Icon.HEART : Icon.HEART_OUTLINE}
                                        color={
                                            aquascape.isLikedByMe ? colors.SECONDARY : colors.WHITE
                                        }
                                    />
                                }
                                dimensions="extraSmall"
                                color="tertiary"
                            >
                                <FormattedMessage
                                    id="aquascape.hero_section.like"
                                    defaultMessage="Like"
                                />
                            </Button>
                        </Hero.TopRight>
                    </Hero.TopSection>
                }
                bottomSection={
                    <Hero.BottomSection>
                        <Hero.BottomLeft>
                            <div className="icons">
                                <IconText
                                    icon={Icon.EYE_SHOW_FULL}
                                    text={aquascape.viewsCount === 0 ? 1 : aquascape.viewsCount}
                                    color={colors.WHITE}
                                />
                                <IconButton onClick={toggleLike}>
                                    <IconText
                                        icon={
                                            aquascape.isLikedByMe ? Icon.HEART : Icon.HEART_OUTLINE
                                        }
                                        text={aquascape.likesCount}
                                        color={colors.WHITE}
                                    />
                                </IconButton>
                            </div>
                        </Hero.BottomLeft>
                        <Hero.BottomRight>
                            {aquascape.tags.map((tag, index) => (
                                <Tag key={index} text={tag.name} variant="primary" size="large" />
                            ))}
                        </Hero.BottomRight>
                    </Hero.BottomSection>
                }
            />

            <style jsx>{`
                .icons {
                    margin-left: -${spaces.s12};
                }

                .follow {
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}

export default HeroSection
