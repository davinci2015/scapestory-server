import React, {useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useQuery, useMutation, useLazyQuery} from 'react-apollo'
import {FormattedMessage} from 'react-intl'
import {Element} from 'react-scroll'
import {DataProxy} from 'apollo-cache'

import {AQUASCAPE_DETAILS, AquascapeDetailsQuery} from 'containers/AquascapeDetails/query'
import {Divider} from 'components/atoms'
import {Grid, Content} from 'components/core'
import {SubNavigation} from 'components/molecules'
import {LikeEntityType} from 'generated/graphql'
import {LIKE, DISLIKE} from 'graphql/mutations'
import {ModalContext} from 'providers/ModalProvider'
import {AQUASCAPES, AquascapeData} from 'graphql/queries'
import CommentsContainer from 'containers/AquascapeDetails/Comments'
import {AuthContext} from 'providers/AuthenticationProvider'
import {
    HeroSection,
    FloraSection,
    EquipmentSection,
    UserAquascapesSection,
    PhotoSection,
    OtherAquascapesSection
} from 'components/sections/AquascapeDetails'

const sections = {
    PHOTO_POSTS: 'PHOTO_POSTS',
    FLORA: 'FLORA',
    EQUIPMENT: 'EQUIPMENT',
    COMMENTS: 'COMMENTS'
}

const AquascapeDetailsContainer: React.FunctionComponent = () => {
    const router = useRouter()
    const {isAuthenticated} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)
    const id = router.query.id

    const [
        getUserAquascapes,
        {
            called: getUserAquascapesCalled,
            data: userAquascapesResult,
        }
    ] = useLazyQuery(AQUASCAPES)

    const {
        data: aquascapeResult,
        error,
        loading
    } = useQuery<AquascapeDetailsQuery>(AQUASCAPE_DETAILS, {variables: {id: Number(id)}})

    const updateLikeCache = (isLiked: boolean) => (cache: DataProxy) => {
        const data = cache.readQuery<AquascapeDetailsQuery>({query: AQUASCAPE_DETAILS, variables: {id: Number(id)}})
        if (data) {
            cache.writeQuery({
                query: AQUASCAPE_DETAILS,
                data: {
                    ...data,
                    aquascape: {
                        ...data.aquascape,
                        likesCount: isLiked ? data.aquascape.likesCount + 1 : data.aquascape.likesCount - 1,
                        isLikedByMe: isLiked
                    }
                }
            })
        }
    }

    const [like] = useMutation(LIKE, {
        update: updateLikeCache(true)
    })

    const [dislike] = useMutation(DISLIKE, {
        update: updateLikeCache(false)
    })

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
                entityId: aquascapeResult.aquascape.id
            }
        })
    }

    const toggleFollow = () => {
        if (!aquascapeResult || !aquascapeResult.aquascape) {
            return
        }

        if (!isAuthenticated) {
            return openModal('login')
        }
    }

    useEffect(() => {
        aquascapeResult && !getUserAquascapesCalled && getUserAquascapes({
            variables: {
                pagination: {limit: 4, offset: 0},
                userId: aquascapeResult.aquascape.user.id
            }
        })
    }, [aquascapeResult])

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

    return (
        <Content>
            <HeroSection
                aquascape={aquascapeResult.aquascape}
                isLiked={aquascapeResult.aquascape.isLikedByMe}
                isUserFollowed={aquascapeResult.aquascape.isLikedByMe}
                toggleFollow={toggleFollow}
                toggleLike={toggleLike}
            />
            <SubNavigation>
                <SubNavigation.Item id={sections.PHOTO_POSTS}>
                    <FormattedMessage id="aquascape.subnavigation.photo" defaultMessage="Photo Posts" />
                </SubNavigation.Item>
                <SubNavigation.Item id={sections.FLORA}>
                    <FormattedMessage id="aquascape.subnavigation.flora" defaultMessage="Flora & Fauna" />
                </SubNavigation.Item>
                <SubNavigation.Item id={sections.EQUIPMENT}>
                    <FormattedMessage id="aquascape.subnavigation.equipment" defaultMessage="Equipment" />
                </SubNavigation.Item>
                <SubNavigation.Item id={sections.COMMENTS}>
                    <FormattedMessage id="aquascape.subnavigation.comments" defaultMessage="Comments" />
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
                {
                    userAquascapesResult && userAquascapesResult.aquascapes.length > 1 &&
                    <>
                        <UserAquascapesSection
                            aquascapes={userAquascapesResult.aquascapes.filter((scape: AquascapeData) => scape.id !== aquascapeResult.aquascape.id)}
                            username={aquascapeResult.aquascape.user.name || aquascapeResult.aquascape.user.username}
                        />
                        <Divider />
                    </>
                }
                <Element name={sections.COMMENTS}>
                    <CommentsContainer aquascapeId={Number(id)} />
                </Element>
                {
                    aquascapeResult.aquascapes && Boolean(aquascapeResult.aquascapes.length) &&
                    <>
                        <Divider />
                        <OtherAquascapesSection aquascapes={aquascapeResult.aquascapes} />
                    </>
                }
            </Grid>
        </Content>
    )
}

export default AquascapeDetailsContainer