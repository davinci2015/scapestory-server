import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {zIndex} from 'styles'
import {Hero} from 'components/sections/shared'
import {Button, FormattedMessage} from 'components/atoms'
import UserFollowIcon from 'assets/icons/user-plus.svg'
import UserUnfollowIcon from 'assets/icons/user-minus.svg'

interface Props {
    user: UserBySlugQuery['user']
    toggleFollow: () => void
}

const COVER_PLACEHOLDER = 'https://ak9.picdn.net/shutterstock/videos/1014275129/thumb/1.jpg'

const CoverSection: React.FunctionComponent<Props> = ({toggleFollow, user}) => {
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
                                {user.isFollowedByMe ? (
                                    <Button
                                        onClick={toggleFollow}
                                        dimensions="extraSmall"
                                        leftIcon={<UserUnfollowIcon />}
                                        color="tertiary"
                                    >
                                        <FormattedMessage
                                            id="user_profile.unfollow"
                                            defaultMessage="Unfollow"
                                        />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={toggleFollow}
                                        dimensions="extraSmall"
                                        leftIcon={<UserFollowIcon />}
                                        color="tertiary"
                                    >
                                        <FormattedMessage
                                            id="user_profile.follow"
                                            defaultMessage="Follow"
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
