import React, {ChangeEvent, useState} from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {FormattedMessage, Textarea, Input, InputAdornment} from 'components/atoms'
import UserSection from 'components/sections/Profile/UserSection'
import UserStats from 'components/sections/Profile/UserStats'
import UserAbout from 'components/sections/Profile/UserAbout'
import EditableUserImage from 'components/sections/Profile/UserSection/EditableUserImage'
import {
    SocialNetwork,
    socialIconComponentMapping,
} from 'components/sections/Profile/UserAbout/SocialLink'

interface Props {
    user: UserBySlugQuery['user']
    onChangeProfileImage: (files: FileList | null) => void
}

type SocialNetworkKey = 'facebookUrl' | 'instagramUrl' | 'youtubeUrl' | 'twitterUrl'

interface SocialNetworkInput {
    key: SocialNetworkKey
    placeholder: string
    label: string
    Icon: () => JSX.Element
}

const socialNetworkInputs: SocialNetworkInput[] = [
    {
        key: 'facebookUrl',
        placeholder: 'Facebook URL',
        label: 'Facebook',
        Icon: socialIconComponentMapping[SocialNetwork.FACEBOOK],
    },
    {
        key: 'instagramUrl',
        placeholder: 'Instagram URL',
        label: 'Instagram',
        Icon: socialIconComponentMapping[SocialNetwork.INSTAGRAM],
    },
    {
        key: 'youtubeUrl',
        placeholder: 'Youtube URL',
        label: 'Youtube',
        Icon: socialIconComponentMapping[SocialNetwork.YOUTUBE],
    },
    {
        key: 'twitterUrl',
        placeholder: 'Twitter URL',
        label: 'Twitter',
        Icon: socialIconComponentMapping[SocialNetwork.TWITTER],
    },
]

const UserSectionEditContainer: React.FunctionComponent<Props> = ({onChangeProfileImage, user}) => {
    const [networkUrls, setNetworkUrl] = useState({})
    const [about, setAbout] = useState()

    if (!user) return null

    const updateNetworkUrl = (key: SocialNetworkKey) => (event: ChangeEvent<HTMLInputElement>) => {
        setNetworkUrl({...networkUrls, [key]: event.target.value})
    }

    const updateAbout = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAbout(event.target.value)
    }

    // const updateUserDetails = () => {
    //     updateUserDetailsMutation({
    //         variables: {
    //             name: user.name,
    //             about: user.about,
    //             facebookUrl: user.facebookUrl,
    //             youtubeUrl: user.youtubeUrl,
    //             instagramUrl: user.instagramUrl,
    //             twitterUrl: user.twitterUrl
    //         }
    //     })
    // }

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
                    about={
                        <Textarea
                            placeholder="Write something about yourself... [max. 200 characters]"
                            onChange={updateAbout}
                        />
                    }
                    socialNetworkArea={socialNetworkInputs.map(network => (
                        <Input
                            key={network.key}
                            placeholder={network.placeholder}
                            label={network.label}
                            onChange={updateNetworkUrl(network.key)}
                            value={user[network.key] || ''}
                            endAdornment={
                                <InputAdornment>
                                    <network.Icon />
                                </InputAdornment>
                            }
                        />
                    ))}
                />
            }
        />
    )
}

export default UserSectionEditContainer
