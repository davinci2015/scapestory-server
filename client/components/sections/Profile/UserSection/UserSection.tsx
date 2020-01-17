import React from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {colors} from 'styles'
import {Headline, UserImage} from 'components/atoms'
import {UserImageSize, UserImageVariant} from 'components/atoms/UserImage/UserImage'

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
                }
            `}</style>
        </>
    )
}

export default UserSection
