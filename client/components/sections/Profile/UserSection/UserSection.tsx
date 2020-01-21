import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {colors, spaces} from 'styles'
import {Headline, UserImage, FormattedMessage} from 'components/atoms'
import {UserImageSize, UserImageVariant} from 'components/atoms/UserImage/UserImage'
import UserAbout from '../UserAbout'
import UserStats from '../UserStats'
import SocialLink, {SocialNetwork} from '../UserAbout/SocialLink'

interface Props {
    user: UserBySlugQuery['user']
}

const UserSection: React.FunctionComponent<Props> = ({user}) => {
    if (!user) return null

    return (
        <>
            <div className="section">
                <div className="user-image">
                    <UserImage
                        image={user.profileImage}
                        size={UserImageSize.s148}
                        variant={UserImageVariant.BORDER}
                    />
                </div>
                <div className="user">
                    <div className="username">
                        <Headline as="h1" variant="h4" color={colors.WHITE}>
                            {user.name}
                        </Headline>
                    </div>
                    <div className="user-info">
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
                        <div className="user-info__about">
                            <UserAbout
                                socialNetworkArea={
                                    <div>
                                        {user.facebookUrl && (
                                            <SocialLink
                                                network={SocialNetwork.FACEBOOK}
                                                url={user.facebookUrl}
                                            />
                                        )}
                                        {user.youtubeUrl && (
                                            <SocialLink
                                                network={SocialNetwork.YOUTUBE}
                                                url={user.youtubeUrl}
                                            />
                                        )}
                                        {user.instagramUrl && (
                                            <SocialLink
                                                network={SocialNetwork.INSTAGRAM}
                                                url={user.instagramUrl}
                                            />
                                        )}
                                        {user.twitterUrl && (
                                            <SocialLink
                                                network={SocialNetwork.TWITTER}
                                                url={user.twitterUrl}
                                            />
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
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .section {
                    position: relative;
                    margin-top: -74px;
                }

                .user-image {
                    position: absolute;
                    left: -190px;
                }

                .username {
                    padding-top: 14px;
                    padding-bottom: 24px;
                }

                .user-info {
                    margin-top: ${spaces.s36};
                }

                .user-info__about {
                    margin: ${spaces.s60} 0;
                }
            `}</style>
        </>
    )
}

export default UserSection
