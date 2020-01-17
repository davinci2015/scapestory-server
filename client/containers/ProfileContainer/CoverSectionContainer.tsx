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
}

const CoverSectionContainer: React.FunctionComponent<Props> = ({user}) => {
    if (!user) return null

    const {isAuthenticated} = useContext(AuthContext)
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

    return <CoverSection toggleFollow={toggleFollow} user={user} />
}

export default CoverSectionContainer
