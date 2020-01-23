import React, {useContext} from 'react'
import {useMutation} from 'react-apollo'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {
    FollowUserMutation,
    FollowUserMutationVariables,
    UnfollowUserMutation,
    UnfollowUserMutationVariables,
} from 'graphql/generated/mutations'
import {updateProfileCache, ProfileActions} from 'containers/ProfileContainer/cache'
import {FOLLOW, UNFOLLOW} from 'graphql/mutations'
import {AuthContext} from 'providers/AuthenticationProvider'
import {ModalContext} from 'providers/ModalProvider'
import CoverSection from 'components/sections/Profile/CoverSection'
import {Button, FormattedMessage, Icon} from 'components/atoms'
import UserFollowIcon from 'assets/icons/user-plus.svg'
import UserUnfollowIcon from 'assets/icons/user-minus.svg'
import LogoutIcon from 'assets/icons/log-out.svg'
import {colors} from 'styles'
import cookie from 'services/cookie'

interface Props {
    user: UserBySlugQuery['user']
    onEdit: VoidFunction
}

const FollowButton = ({toggleFollow}: {toggleFollow: VoidFunction}) => (
    <Button
        onClick={toggleFollow}
        dimensions="extraSmall"
        leftIcon={<UserFollowIcon />}
        color="tertiary"
    >
        <FormattedMessage id="user_profile.follow" defaultMessage="Follow" />
    </Button>
)

const UnfollowButton = ({toggleFollow}: {toggleFollow: VoidFunction}) => (
    <Button
        onClick={toggleFollow}
        dimensions="extraSmall"
        leftIcon={<UserUnfollowIcon />}
        color="tertiary"
    >
        <FormattedMessage id="user_profile.unfollow" defaultMessage="Unfollow" />
    </Button>
)

const CoverSectionContainer: React.FunctionComponent<Props> = ({onEdit, user}) => {
    if (!user) return null

    const {isAuthenticated, refreshAuthentication, user: loggedInUser} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)

    const [follow] = useMutation<FollowUserMutation, FollowUserMutationVariables>(FOLLOW, {
        update: updateProfileCache(ProfileActions.FOLLOW, {slug: user.slug}),
    })

    const [unfollow] = useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UNFOLLOW, {
        update: updateProfileCache(ProfileActions.UNFOLLOW, {slug: user.slug}),
    })

    const onLogout = () => {
        cookie.removeAuthToken()
        refreshAuthentication()
    }

    const toggleFollow = () => {
        if (!isAuthenticated) {
            return openModal('login')
        }

        const mutateFollow = user.isFollowedByMe ? unfollow : follow
        mutateFollow({variables: {userId: user.id}})
    }

    const isMyProfile = loggedInUser?.id === user.id

    return (
        <CoverSection
            coverImage={user.coverImage}
            actionButtons={
                <>
                    {!isMyProfile &&
                        (user.isFollowedByMe ? (
                            <UnfollowButton toggleFollow={toggleFollow} />
                        ) : (
                            <FollowButton toggleFollow={toggleFollow} />
                        ))}

                    {isMyProfile && (
                        <>
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
                            <Button
                                leftIcon={<LogoutIcon />}
                                dimensions="extraSmall"
                                color="tertiary"
                                onClick={onLogout}
                            >
                                <FormattedMessage
                                    id="user_profile.logout"
                                    defaultMessage="Logout"
                                />
                            </Button>
                        </>
                    )}
                </>
            }
        />
    )
}

export default CoverSectionContainer
