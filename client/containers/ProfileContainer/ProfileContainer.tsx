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
import {Content, Grid} from 'components/core'
import ProfileSection from 'components/sections/Profile/ProfileSection'
import {AquascapeCardList} from 'components/sections/shared'
import {Headline, FormattedMessage} from 'components/atoms'
import {renderAquascapeCards} from 'utils/render'

const ProfileContainer = () => {
    const router = useRouter()
    const {isAuthenticated} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)
    const slug = router.query.slug?.toString()

    if (!slug) return null

    const {data: userResult, error, loading} = useQuery<UserBySlugQuery, UserBySlugQueryVariables>(
        USER_BY_SLUG,
        {variables: {slug, pagination: {limit: 8, cursor: null}}, fetchPolicy: 'cache-and-network'}
    )

    const [follow] = useMutation<FollowUserMutation, FollowUserMutationVariables>(FOLLOW, {
        update: updateProfileCache(ProfileActions.FOLLOW, {slug}),
    })

    const [unfollow] = useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UNFOLLOW, {
        update: updateProfileCache(ProfileActions.UNFOLLOW, {slug}),
    })

    const toggleFollow = () => {
        if (!userResult || !userResult.user) {
            return
        }

        if (!isAuthenticated) {
            return openModal('login')
        }

        const mutateFollow = userResult.user.isFollowedByMe ? unfollow : follow
        mutateFollow({variables: {userId: userResult.user.id}})
    }

    if (loading) {
        // TODO: handle loading properly
        return null
    }

    if (error) {
        // TODO: handle error properly
        return null
    }

    if (!userResult || !userResult.user) {
        // TODO: handle not found user
        return null
    }

    return (
        <Content>
            <Grid>
                <ProfileSection toggleFollow={toggleFollow} user={userResult.user} />
                {userResult.user.aquascapes.rows.length && (
                    <AquascapeCardList
                        title={
                            <Headline as="h2" variant="h4">
                                <FormattedMessage
                                    id="home_list_title_explore"
                                    defaultMessage="{name}'s aquascapes"
                                    values={{name: userResult.user.name}}
                                />
                            </Headline>
                        }
                    >
                        <Grid.Row>{renderAquascapeCards(userResult.user.aquascapes.rows)}</Grid.Row>
                    </AquascapeCardList>
                )}
            </Grid>
        </Content>
    )
}

export default ProfileContainer
