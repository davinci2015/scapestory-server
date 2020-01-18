import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {zIndex, colors} from 'styles'
import {Hero} from 'components/sections/shared'
import {Button, FormattedMessage, Icon} from 'components/atoms'
import UserFollowIcon from 'assets/icons/user-plus.svg'
import UserUnfollowIcon from 'assets/icons/user-minus.svg'

interface Props {
    user: UserBySlugQuery['user']
    toggleFollow: VoidFunction
    onEdit: VoidFunction
    isMyProfile: boolean
}

const COVER_PLACEHOLDER = 'https://ak9.picdn.net/shutterstock/videos/1014275129/thumb/1.jpg'

const FollowButton = ({
    isFollowedByMe,
    toggleFollow,
}: {
    isFollowedByMe: boolean
    toggleFollow: VoidFunction
}) =>
    isFollowedByMe ? (
        <Button
            onClick={toggleFollow}
            dimensions="extraSmall"
            leftIcon={<UserUnfollowIcon />}
            color="tertiary"
        >
            <FormattedMessage id="user_profile.unfollow" defaultMessage="Unfollow" />
        </Button>
    ) : (
        <Button
            onClick={toggleFollow}
            dimensions="extraSmall"
            leftIcon={<UserFollowIcon />}
            color="tertiary"
        >
            <FormattedMessage id="user_profile.follow" defaultMessage="Follow" />
        </Button>
    )

const CoverSection: React.FunctionComponent<Props> = ({
    isMyProfile,
    onEdit,
    toggleFollow,
    user,
}) => {
    if (!user) return null

    return (
        <>
            <div className="section">
                <Hero
                    image={user.coverImage || COVER_PLACEHOLDER}
                    variant="cover"
                    height="compact"
                    topSection={
                        <Hero.TopSection>
                            <Hero.TopLeft></Hero.TopLeft>
                            <Hero.TopRight>
                                {!isMyProfile && (
                                    <FollowButton
                                        isFollowedByMe={user.isFollowedByMe}
                                        toggleFollow={toggleFollow}
                                    />
                                )}

                                {isMyProfile && (
                                    <Button
                                        leftIcon={<Icon d={Icon.EDIT} color={colors.WHITE} />}
                                        dimensions="extraSmall"
                                        color="tertiary"
                                        onClick={onEdit}
                                    >
                                        <FormattedMessage
                                            id="user_profile.edit"
                                            defaultMessage="Edit profile"
                                        />
                                    </Button>
                                )}
                            </Hero.TopRight>
                        </Hero.TopSection>
                    }
                />
            </div>
            <style jsx>{`
                .section {
                }

                .cover {
                    position: relative;
                    width: 100%;
                    height: 270px;
                }

                .cover-image {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: ${zIndex.BELOW};
                }
            `}</style>
        </>
    )
}

export default CoverSection
