import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {UserImage, FormattedMessage, Paragraph} from 'components/atoms'
import {UserImageSize, UserImageVariant} from 'components/atoms/UserImage/UserImage'
import UserSection from 'components/sections/Profile/UserSection'
import UserStats from 'components/sections/Profile/UserStats'
import UserAbout from 'components/sections/Profile/UserAbout'
import SocialLink, {SocialNetwork} from 'components/sections/Profile/UserAbout/SocialLink'

interface Props {
    user: UserBySlugQuery['user']
}

const UserSectionContainer: React.FunctionComponent<Props> = ({user}) => {
    if (!user) return null

    return (
        <UserSection
            username={user.name}
            userImage={
                <UserImage
                    image={user.profileImage}
                    size={UserImageSize.s148}
                    variant={UserImageVariant.BORDER}
                />
            }
            stats={
                <UserStats>
                    <UserStats.Item
                        title={
                            <FormattedMessage
                                id="user_profile.followers"
                                defaultMessage="Followers"
                            />
                        }
                        value={user.followersCount}
                    />
                    <UserStats.Item
                        title={
                            <FormattedMessage
                                id="user_profile.followers"
                                defaultMessage="Following"
                            />
                        }
                        value={user.followingCount}
                    />
                    <UserStats.Item
                        title={
                            <FormattedMessage
                                id="user_profile.no_aquascapes"
                                defaultMessage="Aquascapes"
                            />
                        }
                        value={user.aquascapes.count}
                    />
                </UserStats>
            }
            about={
                <UserAbout
                    about={<Paragraph>{user.about}</Paragraph>}
                    socialNetworkArea={
                        <div>
                            {user.facebookUrl && (
                                <SocialLink
                                    network={SocialNetwork.FACEBOOK}
                                    url={user.facebookUrl}
                                />
                            )}
                            {user.youtubeUrl && (
                                <SocialLink network={SocialNetwork.YOUTUBE} url={user.youtubeUrl} />
                            )}
                            {user.instagramUrl && (
                                <SocialLink
                                    network={SocialNetwork.INSTAGRAM}
                                    url={user.instagramUrl}
                                />
                            )}
                            {user.twitterUrl && (
                                <SocialLink network={SocialNetwork.TWITTER} url={user.twitterUrl} />
                            )}
                        </div>
                    }
                    shouldDisplayPlaceholder={
                        !(
                            user.about ||
                            user.facebookUrl ||
                            user.instagramUrl ||
                            user.twitterUrl ||
                            user.youtubeUrl
                        )
                    }
                />
            }
        />
    )
}

export default UserSectionContainer
