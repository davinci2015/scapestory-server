import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {FormattedMessage} from 'components/atoms'
import UserSection from 'components/sections/Profile/UserSection'
import UserStats from 'components/sections/Profile/UserStats'
import UserAbout from 'components/sections/Profile/UserAbout'
import SocialLink, {SocialNetwork} from 'components/sections/Profile/UserAbout/SocialLink'
import EditableUserImage from 'components/sections/Profile/UserSection/EditableUserImage'

interface Props {
    user: UserBySlugQuery['user']
    onChangeProfileImage: (files: FileList | null) => void
}

const UserSectionEditContainer: React.FunctionComponent<Props> = ({onChangeProfileImage, user}) => {
    if (!user) return null

    return (
        <UserSection
            username={user.name}
            userImage={
                <EditableUserImage image={user.profileImage} onChange={onChangeProfileImage} />
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
                />
            }
        />
    )
}

export default UserSectionEditContainer
