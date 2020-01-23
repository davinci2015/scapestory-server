import React, {useContext} from 'react'
import {useRouter} from 'next/router'
import {useMutation} from 'react-apollo'

import {LikeEntityType} from 'graphql/generated/types'
import {LIKE, DISLIKE, FOLLOW, UNFOLLOW} from 'graphql/mutations'
import {ModalContext} from 'providers/ModalProvider'
import {AuthContext} from 'providers/AuthenticationProvider'
import {
    updateAquascapeDetailsCache,
    AquascapeDetailsActions,
} from 'containers/AquascapeDetailsContainer/cache'
import {HeroSection} from 'components/sections/AquascapeDetails'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {
    LikeMutation,
    LikeMutationVariables,
    DislikeMutation,
    DislikeMutationVariables,
    FollowUserMutation,
    FollowUserMutationVariables,
    UnfollowUserMutation,
    UnfollowUserMutationVariables,
} from 'graphql/generated/mutations'
import routes, {createDynamicPath, getAquascapeDetailsSlug} from 'routes'
import config from 'config'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const HeroSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    const router = useRouter()
    const {isAuthenticated, user} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)

    if (!aquascape) return null

    const [like] = useMutation<LikeMutation, LikeMutationVariables>(LIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_LIKE, {
            aquascapeId: aquascape.id,
            isLiked: true,
        }),
    })

    const [dislike] = useMutation<DislikeMutation, DislikeMutationVariables>(DISLIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_LIKE, {
            aquascapeId: aquascape.id,
            isLiked: false,
        }),
    })

    const [follow] = useMutation<FollowUserMutation, FollowUserMutationVariables>(FOLLOW, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_USER_FOLLOW, {
            aquascapeId: aquascape.id,
            isFollowed: true,
        }),
    })

    const [unfollow] = useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UNFOLLOW, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_USER_FOLLOW, {
            aquascapeId: aquascape.id,
            isFollowed: false,
        }),
    })

    const toggleLike = () => {
        if (!aquascape) {
            return
        }

        if (!isAuthenticated) {
            return openModal('register')
        }

        const mutateLike = aquascape.isLikedByMe ? dislike : like
        mutateLike({
            variables: {
                entity: LikeEntityType.Aquascape,
                entityId: aquascape.id,
            },
        })
    }

    const toggleFollow = () => {
        if (!aquascape || !aquascape.user) {
            return
        }

        if (!isAuthenticated) {
            return openModal('register')
        }

        const mutateFollow = aquascape.user.isFollowedByMe ? unfollow : follow
        mutateFollow({variables: {userId: aquascape.user.id}})
    }

    const redirectToEdit = () => {
        if (!aquascape) return null

        router.push(
            createDynamicPath(routes.aquascapeDetailsEdit, {
                id: aquascape.id.toString(),
                title: getAquascapeDetailsSlug(
                    aquascape.title || config.EDIT_AQUASCAPE_URL_TITLE_PLACEHOLDER
                ),
            })
        )
    }

    const mineAquascape = aquascape.user && user ? aquascape.user.id === user.id : false

    return (
        <HeroSection
            onEdit={redirectToEdit}
            mineAquascape={mineAquascape}
            aquascape={aquascape}
            toggleFollow={toggleFollow}
            toggleLike={toggleLike}
        />
    )
}

export default HeroSectionContainer
