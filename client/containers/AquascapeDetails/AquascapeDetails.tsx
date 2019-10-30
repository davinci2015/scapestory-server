import React, {useContext} from 'react'
import {useRouter} from 'next/router'
import {useQuery, useMutation} from 'react-apollo'
import {FormattedMessage} from 'react-intl'
import {Element} from 'react-scroll'
import {DataProxy} from 'apollo-cache'

import {AQUASCAPE_DETAILS} from 'containers/AquascapeDetails/query'
import {Divider} from 'components/atoms'
import {Grid, Content} from 'components/core'
import {SubNavigation} from 'components/molecules'
import {Plant, Livestock, Hardscape, Light, Filter, Substrate, Additive, Co2, User, LikeEntityType} from 'generated/graphql'
import {HeroSection, FloraSection, EquipmentSection, UserAquascapesSection} from 'components/sections/AquascapeDetails'
import {LIKE, DISLIKE} from 'graphql/mutations'
import {AuthContext} from 'context/auth'
import {ModalContext} from 'context/modal'


export interface AquascapeDetails {
    id: number
    title: string
    mainImage: string
    viewsCount: number
    likesCount: number
    isLikedByMe: boolean
    plants: Pick<Plant, 'id' | 'name'>[]
    livestock: Pick<Livestock, 'id' | 'name'>[]
    hardscape: Pick<Hardscape, 'id' | 'name'>[]
    lights: Pick<Light, 'id' | 'brand' | 'model'>[]
    filters: Pick<Filter, 'id' | 'brand' | 'model'>[]
    co2: Pick<Co2, 'id' | 'type' | 'bps'>
    substrates: Pick<Substrate, 'id' | 'brand' | 'name'>[]
    additives: Pick<Additive, 'id' | 'brand' | 'name'>[]
    tags: {name: string}[]
    user: Pick<User, 'name' | 'profileImage' | 'username'>
}

interface AquascapeDetailsQuery {
    aquascape: AquascapeDetails
}

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
    const {data, error, loading} = useQuery<AquascapeDetailsQuery>(AQUASCAPE_DETAILS, {variables: {id: Number(id)}})
    
    const updateLikeCache = (isLiked: boolean) => (cache: DataProxy) => {
        const data = cache.readQuery<AquascapeDetailsQuery>({query: AQUASCAPE_DETAILS, 
            variables: {id: Number(id)}
        })
        if (data) {
            cache.writeQuery({
                query: AQUASCAPE_DETAILS,
                data: {aquascape: {
                    ...data.aquascape, 
                    likesCount: isLiked ? data.aquascape.likesCount + 1 : data.aquascape.likesCount - 1,
                    isLikedByMe: isLiked
                }}
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
        if (!data || !data.aquascape) {
            return 
        }

        if (!isAuthenticated) {
            return openModal('login')
        }

        const mutateLike = data.aquascape.isLikedByMe ? dislike : like
        mutateLike({
            variables: {
                entity: LikeEntityType.Aquascape,
                entityId: data.aquascape.id
            }
        })
    }

    if (loading) {
        // TODO: Show loader
        return null
    }

    if (error) {
        // TODO: Show error
        return null
    }

    if (!data || !data.aquascape) {
        // TODO: Return not found page
        return null
    }

    const hasEquipment = ['lights', 'filters', 'substrates', 'additives']
        .some(equipment => data.aquascape.hasOwnProperty(equipment) && Boolean(data.aquascape.lights.length)) || data.aquascape.co2

    return (
        <Content>
            <HeroSection aquascape={data.aquascape} isLiked={data.aquascape.isLikedByMe} toggleLike={toggleLike}/>
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
                    <FormattedMessage id="aquascape.subnavigation.comments" defaultMessage="Comments({count})" values={{count: 10}} />
                </SubNavigation.Item>
            </SubNavigation>
            <Grid>
                <Divider />
                <Element name={sections.FLORA}>
                    <FloraSection
                        plants={data.aquascape.plants}
                        livestock={data.aquascape.livestock}
                        hardscape={data.aquascape.hardscape}
                    />
                </Element>
                <Divider />
                {
                    hasEquipment &&
                    <Element name={sections.EQUIPMENT}>
                        <EquipmentSection
                            lights={data.aquascape.lights}
                            filters={data.aquascape.filters}
                            substrates={data.aquascape.substrates}
                            additives={data.aquascape.additives}
                            co2={data.aquascape.co2}
                        />
                        <Divider />
                    </Element>
                }
                <UserAquascapesSection username={data.aquascape.user.name || data.aquascape.user.username}/>
            </Grid>
        </Content>
    )
}

export default AquascapeDetailsContainer