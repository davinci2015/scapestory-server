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

interface Props {
    user: UserBySlugQuery['user']
    onEdit: VoidFunction
}

const CoverSectionContainer: React.FunctionComponent<Props> = ({onEdit, user}) => {
    if (!user) return null

    const {isAuthenticated, user: loggedInUser} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)

    const [follow] = useMutation<FollowUserMutation, FollowUserMutationVariables>(FOLLOW, {
        update: updateProfileCache(ProfileActions.FOLLOW, {slug: user.slug}),
    })

    const [unfollow] = useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UNFOLLOW, {
        update: updateProfileCache(ProfileActions.UNFOLLOW, {slug: user.slug}),
    })

    const toggleFollow = () => {
        if (!isAuthenticated) {
            return openModal('login')
        }

        const mutateFollow = user.isFollowedByMe ? unfollow : follow
        mutateFollow({variables: {userId: user.id}})
    }

    return (
        <CoverSection
            user={user}
            toggleFollow={toggleFollow}
            onEdit={onEdit}
            isMyProfile={loggedInUser?.id === user.id}
        />
    )
}

export default CoverSectionContainer
