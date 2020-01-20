import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {colors, spaces} from 'styles'
import {Headline, FormattedMessage, Paragraph, Icon} from 'components/atoms'
import TwitterIcon from 'assets/icons/twitter.svg'
import YoutubeIcon from 'assets/icons/youtube.svg'

interface Props {
    user: UserBySlugQuery['user']
}

const UserAbout: React.FunctionComponent<Props> = ({user}) => {
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
            <div className="about">
                <Headline as="h5">
                    <FormattedMessage id="user_profile.about" defaultMessage="About" />
                </Headline>
            </div>
            {user.about && (
                <div className="about-text">
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
            <div>
                {user.facebookUrl && (
                    <div className="social-block">
                        <Icon d={Icon.FACEBOOK} viewBox="0 0 24 24" color={colors.PRIMARY} />
                        <a href={user.facebookUrl} target="_blank" rel="noopener noreferrer">
                            {user.facebookUrl}
                        </a>
                    </div>
                )}
                {user.youtubeUrl && (
                    <div className="social-block youtube">
                        <YoutubeIcon />
                        <a href={user.youtubeUrl} target="_blank" rel="noopener noreferrer">
                            {user.youtubeUrl}
                        </a>
                    </div>
                )}
                {user.instagramUrl && (
                    <div className="social-block">
                        <Icon d={Icon.INSTAGRAM} viewBox="0 0 48 48" color={colors.PRIMARY} />
                        <a href={user.instagramUrl} target="_blank" rel="noopener noreferrer">
                            {user.instagramUrl}
                        </a>
                    </div>
                )}
                {user.twitterUrl && (
                    <div className="social-block twitter">
                        <TwitterIcon />
                        <a href={user.twitterUrl} target="_blank" rel="noopener noreferrer">
                            {user.twitterUrl}
                        </a>
                    </div>
                )}
            </div>
            <style jsx>{`
                .about {
                    margin-bottom: ${spaces.s12};
                }

                .about-text {
                    margin-bottom: ${spaces.s24};
                }

                .social-block {
                    display: flex;
                    align-items: center;

                    padding-top: ${spaces.s12};
                    padding-bottom: ${spaces.s12};
                }

                .social-block :global(svg) {
                    margin-right: ${spaces.s18};
                }

                .social-block.twitter :global(svg),
                .social-block.youtube :global(svg) {
                    stroke: ${colors.PRIMARY};
                }

                .social-block :global(a) {
                    color: ${colors.BLACK};
                }
            `}</style>
        </>
    )
}

export default UserAbout
