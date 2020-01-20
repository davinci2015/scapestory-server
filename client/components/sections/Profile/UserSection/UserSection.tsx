import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {colors, spaces, typography} from 'styles'
import {Headline, UserImage, FormattedMessage, Paragraph} from 'components/atoms'
import {UserImageSize, UserImageVariant} from 'components/atoms/UserImage/UserImage'
import UserAbout from '../UserAbout'

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
                        <div className="user-info__stats">
                            <div className="user-info__block">
                                <Paragraph as="p" weight="semibold">
                                    <FormattedMessage
                                        id="user_profile.followers"
                                        defaultMessage="Followers"
                                    />
                                </Paragraph>
                                <div className="follow-count">
                                    <Paragraph as="span" weight="bold">
                                        {user.followersCount}
                                    </Paragraph>
                                </div>
                            </div>
                            <div className="user-info__block">
                                <Paragraph as="span" weight="semibold">
                                    <FormattedMessage
                                        id="user_profile.followers"
                                        defaultMessage="Following"
                                    />
                                </Paragraph>
                                <div className="follow-count">
                                    <Paragraph as="span" weight="bold">
                                        {user.followingCount}
                                    </Paragraph>
                                </div>
                            </div>
                        </div>
                        <div className="user-info__about">
                            <UserAbout user={user} />
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

                .user-info__stats {
                    display: flex;
                }

                .user-info__block {
                    display: flex;
                    flex-direction: column;
                    flex-basis: 33%;
                }

                .user-info__about {
                    margin: ${spaces.s60} 0;
                }

                .follow-count :global(.${Paragraph.classes.root}) {
                    font-size: ${typography.fontSize.fs20};
                }
            `}</style>
        </>
    )
}

export default UserSection
