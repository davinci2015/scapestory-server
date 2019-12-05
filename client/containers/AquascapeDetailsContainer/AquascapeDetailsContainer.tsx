import React, {useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useQuery, useMutation} from 'react-apollo'
import {FormattedMessage} from 'react-intl'
import {Element} from 'react-scroll'

import {AQUASCAPE_DETAILS} from 'containers/AquascapeDetailsContainer/queries'
import {Divider} from 'components/atoms'
import {Grid, Content} from 'components/core'
import {SubNavigation} from 'components/molecules'
import {LikeEntityType} from 'graphql/generated/types'
import {LIKE, DISLIKE, FOLLOW, UNFOLLOW, VISIT} from 'graphql/mutations'
import {ModalContext} from 'providers/ModalProvider'
import CommentsContainer from 'containers/AquascapeDetailsContainer/CommentsContainer'
import {AuthContext} from 'providers/AuthenticationProvider'
import {
    updateAquascapeDetailsCache,
    AquascapeDetailsActions,
} from 'containers/AquascapeDetailsContainer/cache'
import {
    HeroSection,
    FloraSection,
    EquipmentSection,
    UserAquascapesSection,
    PhotoSection,
    OtherAquascapesSection,
} from 'components/sections/AquascapeDetails'
import cookie from 'services/cookie'
import {AquascapeDetailsQuery, AquascapeDetailsQueryVariables} from 'graphql/generated/queries'
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

const sections = {
    PHOTO_POSTS: 'PHOTO_POSTS',
    FLORA: 'FLORA',
    EQUIPMENT: 'EQUIPMENT',
    COMMENTS: 'COMMENTS',
}

const AquascapeDetailsContainer: React.FunctionComponent = () => {
    const router = useRouter()
    const {isAuthenticated, user} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)
    const aquascapeId = Number(router.query.id)

    if (!aquascapeId) return null

    const {data: aquascapeResult, error, loading} = useQuery<
        AquascapeDetailsQuery,
        AquascapeDetailsQueryVariables
    >(AQUASCAPE_DETAILS, {variables: {id: aquascapeId}})

    const [like] = useMutation<LikeMutation, LikeMutationVariables>(LIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_LIKE, {
            aquascapeId,
            isLiked: true,
        }),
    })

    const [dislike] = useMutation<DislikeMutation, DislikeMutationVariables>(DISLIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_LIKE, {
            aquascapeId,
            isLiked: false,
        }),
    })

    const [follow] = useMutation<FollowUserMutation, FollowUserMutationVariables>(FOLLOW, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_USER_FOLLOW, {
            aquascapeId,
            isFollowed: true,
        }),
    })

    const [unfollow] = useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UNFOLLOW, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_USER_FOLLOW, {
            aquascapeId,
            isFollowed: false,
        }),
    })

    const [visit] = useMutation(VISIT, {
        variables: {aquascapeId},
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_VISIT, {
            aquascapeId,
        }),
    })

    useEffect(() => {
        const visitAquascape = async () => {
            const {data} = await visit({variables: {aquascapeId}})

            if (data.visitAquascape && !cookie.getVisitorId()) {
                cookie.persistVisitorId(data.visitAquascape.visitor.visitorId)
            }
        }

        visitAquascape()
    }, [aquascapeId])

    const toggleLike = () => {
        if (!aquascapeResult || !aquascapeResult.aquascape) {
            return
        }

        if (!isAuthenticated) {
            return openModal('login')
        }

        const mutateLike = aquascapeResult.aquascape.isLikedByMe ? dislike : like
        mutateLike({
            variables: {
                entity: LikeEntityType.Aquascape,
                entityId: aquascapeResult.aquascape.id,
            },
        })
    }

    const toggleFollow = () => {
        if (!aquascapeResult || !aquascapeResult.aquascape || !aquascapeResult.aquascape.user) {
            return
        }

        if (!isAuthenticated) {
            return openModal('login')
        }

        const mutateFollow = aquascapeResult.aquascape.user.isFollowedByMe ? unfollow : follow
        mutateFollow({variables: {userId: aquascapeResult.aquascape.user.id}})
    }

    if (loading) {
        // TODO: Show loader
        return null
    }

    if (error) {
        // TODO: Show error
        return null
    }

    if (!aquascapeResult || !aquascapeResult.aquascape) {
        // TODO: Return not found page
        return null
    }

    const redirectToEdit = () => {
        if (!aquascapeResult || !aquascapeResult.aquascape) return null

        router.push(
            createDynamicPath(routes.aquascapeDetailsEdit, {
                id: aquascapeResult.aquascape.id.toString(),
                title: getAquascapeDetailsSlug(aquascapeResult.aquascape.title),
            })
        )
    }

    const mineAquascape =
        aquascapeResult.aquascape.user && user
            ? aquascapeResult.aquascape.user.id === user.id
            : false

    return (
        <Content>
            <HeroSection
                onEdit={redirectToEdit}
                mineAquascape={mineAquascape}
                aquascape={aquascapeResult.aquascape}
                toggleFollow={toggleFollow}
                toggleLike={toggleLike}
            />

            <SubNavigation>
                <SubNavigation.Item id={sections.PHOTO_POSTS}>
                    <FormattedMessage
                        id="aquascape.subnavigation.photo"
                        defaultMessage="Photo Posts"
                    />
                </SubNavigation.Item>
                <SubNavigation.Item id={sections.FLORA}>
                    <FormattedMessage
                        id="aquascape.subnavigation.flora"
                        defaultMessage="Flora & Fauna"
                    />
                </SubNavigation.Item>
                <SubNavigation.Item id={sections.EQUIPMENT}>
                    <FormattedMessage
                        id="aquascape.subnavigation.equipment"
                        defaultMessage="Equipment"
                    />
                </SubNavigation.Item>
                <SubNavigation.Item id={sections.COMMENTS}>
                    <FormattedMessage
                        id="aquascape.subnavigation.comments"
                        defaultMessage="Comments ({count})"
                        values={{count: aquascapeResult.aquascape.comments.length}}
                    />
                </SubNavigation.Item>
            </SubNavigation>
            <Grid>
                <Element name={sections.PHOTO_POSTS}>
                    <PhotoSection images={aquascapeResult.aquascape.images} />
                </Element>

                <Divider />

                <Element name={sections.FLORA}>
                    <FloraSection
                        plants={aquascapeResult.aquascape.plants}
                        livestock={aquascapeResult.aquascape.livestock}
                        hardscape={aquascapeResult.aquascape.hardscape}
                    />
                </Element>

                <Divider />

                <Element name={sections.EQUIPMENT}>
                    <EquipmentSection
                        lights={aquascapeResult.aquascape.lights}
                        filters={aquascapeResult.aquascape.filters}
                        substrates={aquascapeResult.aquascape.substrates}
                        additives={aquascapeResult.aquascape.additives}
                        co2={aquascapeResult.aquascape.co2}
                    />
                </Element>

                <Divider />

                {aquascapeResult?.aquascape?.user?.aquascapes?.rows &&
                    aquascapeResult.aquascape.user.aquascapes.rows.length > 1 && (
                        <>
                            <UserAquascapesSection
                                aquascapes={aquascapeResult.aquascape.user.aquascapes.rows.filter(
                                    scape => scape.id !== aquascapeResult.aquascape?.id
                                )}
                                username={aquascapeResult.aquascape.user.name}
                            />
                            <Divider />
                        </>
                    )}

                <Element name={sections.COMMENTS}>
                    <CommentsContainer
                        aquascapeId={aquascapeId}
                        comments={aquascapeResult.aquascape.comments}
                    />
                </Element>

                {aquascapeResult.aquascapes && Boolean(aquascapeResult.aquascapes.rows.length) && (
                    <>
                        <Divider />
                        <OtherAquascapesSection aquascapes={aquascapeResult.aquascapes.rows} />
                    </>
                )}
            </Grid>
        </Content>
    )
}

export default AquascapeDetailsContainer
