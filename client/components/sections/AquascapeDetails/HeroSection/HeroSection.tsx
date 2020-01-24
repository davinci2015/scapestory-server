import React, {SyntheticEvent} from 'react'

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
import {UserWidget, UnfollowButton, FollowButton} from 'components/molecules'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {ProfileLink} from 'components/core'
import {UserWidgetSize, UserWidgetVariant} from 'components/molecules/UserWidget/UserWidget'
import config from 'config'

interface Props {
    mineAquascape: boolean
    aquascape: AquascapeDetailsQuery['aquascape']
    toggleLike: () => void
    toggleFollow: () => void
    onEdit: () => void
}

const HeroSection: React.FunctionComponent<Props> = ({
    aquascape,
    mineAquascape,
    onEdit,
    toggleFollow,
    toggleLike,
}) => {
    if (!aquascape || !aquascape.user) return null

    return (
        <>
            <Hero
                variant="cover"
                title={aquascape.title || config.AQUASCAPE_TITLE_PLACEHOLDER}
                image={aquascape.mainImageUrl}
                topSection={
                    <Hero.TopSection>
                        <Hero.TopLeft>
                            <ProfileLink slug={aquascape.user.slug}>
                                <UserWidget
                                    size={UserWidgetSize.s36}
                                    variant={UserWidgetVariant.BORDER}
                                    image={aquascape.user.profileImage}
                                    text={
                                        <div>
                                            <Paragraph
                                                type="body"
                                                color={colors.WHITE}
                                                weight="bold"
                                            >
                                                <FormattedMessage
                                                    id="aquascape.hero_section.username"
                                                    defaultMessage="by {username}"
                                                    values={{username: aquascape.user.name}}
                                                />
                                            </Paragraph>
                                            {!mineAquascape && (
                                                <div
                                                    className="follow"
                                                    onClick={(event: SyntheticEvent) => {
                                                        event.preventDefault()
                                                        toggleFollow()
                                                    }}
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
                                            )}
                                        </div>
                                    }
                                />
                            </ProfileLink>
                        </Hero.TopLeft>
                        <Hero.TopRight>
                            {!mineAquascape && (
                                <Hero.ActionButtons>
                                    <Button
                                        onClick={toggleLike}
                                        leftIcon={
                                            <Icon
                                                d={
                                                    aquascape.isLikedByMe
                                                        ? Icon.HEART
                                                        : Icon.HEART_OUTLINE
                                                }
                                                color={colors.WHITE}
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
                                    {aquascape.user.isFollowedByMe ? (
                                        <UnfollowButton toggleFollow={toggleFollow} />
                                    ) : (
                                        <FollowButton toggleFollow={toggleFollow} />
                                    )}
                                </Hero.ActionButtons>
                            )}

                            {mineAquascape && (
                                <Button
                                    leftIcon={<Icon d={Icon.EDIT} color={colors.WHITE} />}
                                    dimensions="extraSmall"
                                    color="tertiary"
                                    onClick={onEdit}
                                >
                                    <FormattedMessage
                                        id="aquascape.hero_section.edit"
                                        defaultMessage="Edit"
                                    />
                                </Button>
                            )}
                        </Hero.TopRight>
                    </Hero.TopSection>
                }
                bottomSection={
                    <Hero.BottomSection>
                        <Hero.BottomLeft>
                            <div className="icons">
                                <IconText
                                    icon={Icon.EYE_SHOW_FULL}
                                    text={aquascape.viewsCount}
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
