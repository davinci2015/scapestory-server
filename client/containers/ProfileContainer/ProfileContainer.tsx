import {useContext} from 'react'
import {useRouter} from 'next/router'
import {useQuery, useMutation} from 'react-apollo'
import {USER_BY_SLUG} from 'containers/ProfileContainer/queries'
import {UserBySlugQuery, UserBySlugQueryVariables} from 'graphql/generated/queries'
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
import {Headline, Button} from 'components/atoms'

const ProfileContainer = () => {
    const router = useRouter()
    const {isAuthenticated} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)
    const slug = router.query.slug?.toString()

    if (!slug) return null

    const {data, error, loading} = useQuery<UserBySlugQuery, UserBySlugQueryVariables>(
        USER_BY_SLUG,
        {
            variables: {slug},
            fetchPolicy: 'network-only',
        }
    )

    const [follow] = useMutation<FollowUserMutation, FollowUserMutationVariables>(FOLLOW, {
        update: updateProfileCache(ProfileActions.FOLLOW, {slug}),
    })

    const [unfollow] = useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UNFOLLOW, {
        update: updateProfileCache(ProfileActions.UNFOLLOW, {slug}),
    })

    const toggleFollow = () => {
        if (!data || !data.user) {
            return
        }

        if (!isAuthenticated) {
            return openModal('login')
        }

        const mutateFollow = data.user.isFollowedByMe ? unfollow : follow
        mutateFollow({variables: {userId: data.user.id}})
    }

    if (error) {
        // TODO: handle error properly
        return null
    }

    if (loading) {
        // TODO: handle loading properly
        return null
    }

    if (!data || !data.user) {
        // TODO: handle not found user
        return null
    }

    console.log(data)

    return (
        <div style={{paddingTop: 120}}>
            <Headline>{data?.user.name}</Headline>
            <Button onClick={toggleFollow}>
                {data.user.isFollowedByMe ? 'Unfollow' : 'follow'}
            </Button>
        </div>
    )
}

export default ProfileContainer
