import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {colors, spaces, typography} from 'styles'
import {Headline, UserImage, FormattedMessage, Paragraph, Icon} from 'components/atoms'
import {UserImageSize, UserImageVariant} from 'components/atoms/UserImage/UserImage'
import TwitterIcon from 'assets/icons/twitter.svg'
import YoutubeIcon from 'assets/icons/youtube.svg'

interface Props {
    user: UserBySlugQuery['user']
}

const UserSection: React.FunctionComponent<Props> = ({user}) => {
    if (!user) return null
    const isAboutEmpty = !(
        user.about ||
        user.facebookUrl ||
        user.instagramUrl ||
        user.twitterUrl ||
        user.youtubeUrl
    )

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
                            <Headline as="h5">
                                <FormattedMessage id="user_profile.about" defaultMessage="About" />
                            </Headline>
                            {user.about && (
                                <div className="user-info__about-text">
                                    <Paragraph>{user.about}</Paragraph>
                                </div>
                            )}
                            {isAboutEmpty && (
                                <Paragraph color={colors.SHADE_DEEP}>
                                    <FormattedMessage
                                        id="user_profile.about_placeholder"
                                        defaultMessage="No description nor social media links added yet."
                                    />
                                </Paragraph>
                            )}
                            <div className="user-info__social">
                                {user.facebookUrl && (
                                    <div className="social__block">
                                        <Icon
                                            d={Icon.FACEBOOK}
                                            viewBox="0 0 24 24"
                                            color={colors.PRIMARY}
                                        />
                                        <a
                                            href={user.facebookUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {user.facebookUrl}
                                        </a>
                                    </div>
                                )}
                                {user.youtubeUrl && (
                                    <div className="social__block youtube">
                                        <YoutubeIcon />
                                        <a
                                            href={user.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {user.youtubeUrl}
                                        </a>
                                    </div>
                                )}
                                {user.instagramUrl && (
                                    <div className="social__block">
                                        <Icon
                                            d={Icon.INSTAGRAM}
                                            viewBox="0 0 48 48"
                                            color={colors.PRIMARY}
                                        />
                                        <a
                                            href={user.instagramUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {user.instagramUrl}
                                        </a>
                                    </div>
                                )}
                                {user.twitterUrl && (
                                    <div className="social__block twitter">
                                        <TwitterIcon />
                                        <a
                                            href={user.twitterUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {user.twitterUrl}
                                        </a>
                                    </div>
                                )}
                            </div>
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

                .user-info__about :global(.${Headline.classes.root}) {
                    margin-bottom: ${spaces.s12};
                }

                .user-info__about-text {
                    margin-bottom: ${spaces.s24};
                }

                .follow-count :global(.${Paragraph.classes.root}) {
                    font-size: ${typography.fontSize.fs20};
                }

                .social__block {
                    display: flex;
                    align-items: center;

                    padding-top: ${spaces.s12};
                    padding-bottom: ${spaces.s12};
                }

                .social__block :global(svg) {
                    margin-right: ${spaces.s18};
                }

                .social__block.twitter :global(svg),
                .social__block.youtube :global(svg) {
                    stroke: ${colors.PRIMARY};
                }

                .social__block :global(a) {
                    color: ${colors.BLACK};
                }
            `}</style>
        </>
    )
}

export default UserSection
