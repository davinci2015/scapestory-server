import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useQuery, useMutation} from 'react-apollo'
import {FormattedMessage} from 'react-intl'
import {Element} from 'react-scroll'

import {AQUASCAPE_DETAILS} from 'containers/AquascapeDetailsContainer/queries'
import {Divider, Icon} from 'components/atoms'
import {Grid, Content} from 'components/core'
import {SubNavigation} from 'components/molecules'
import {VISIT} from 'graphql/mutations'
import CommentsContainer from 'containers/AquascapeDetailsContainer/CommentsContainer'
import {
    updateAquascapeDetailsCache,
    AquascapeDetailsActions,
} from 'containers/AquascapeDetailsContainer/cache'
import {
    FloraSection,
    EquipmentSection,
    UserAquascapesSection,
    PhotoSection,
    OtherAquascapesSection,
} from 'components/sections/AquascapeDetails'
import cookie from 'services/cookie'
import {AquascapeDetailsQuery, AquascapeDetailsQueryVariables} from 'graphql/generated/queries'
import HeroSectionContainer from 'containers/AquascapeDetailsContainer/HeroSectionContainer'
import FloraList from 'components/sections/AquascapeDetails/FloraSection/FloraList'
import {colors} from 'styles'

const sections = {
    PHOTO_POSTS: 'PHOTO_POSTS',
    FLORA: 'FLORA',
    EQUIPMENT: 'EQUIPMENT',
    COMMENTS: 'COMMENTS',
}

const AquascapeDetailsContainer: React.FunctionComponent = () => {
    const router = useRouter()
    const aquascapeId = Number(router.query.id)

    if (!aquascapeId) return null

    const {data: aquascapeResult, error, loading} = useQuery<
        AquascapeDetailsQuery,
        AquascapeDetailsQueryVariables
    >(AQUASCAPE_DETAILS, {variables: {id: aquascapeId}, fetchPolicy: 'cache-and-network'})

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

        if (aquascapeResult && !loading) {
            visitAquascape()
        }
    }, [aquascapeResult, loading])

    if (loading) {
        // TODO: Show loader
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
            <HeroSectionContainer aquascape={aquascapeResult.aquascape} />
            <SubNavigation>
                <SubNavigation.Item id={sections.PHOTO_POSTS}>
                    <FormattedMessage
                        id="aquascape.subnavigation.photo"
                        defaultMessage="Photo Diary"
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
                    <FloraSection>
                        <FloraList
                            entities={aquascapeResult.aquascape.plants}
                            title={
                                <FormattedMessage
                                    id="aquascape.flora_and_fauna.plants"
                                    defaultMessage="Plants"
                                />
                            }
                            icon={
                                <Icon
                                    d={Icon.PLANT}
                                    color={colors.WHITE}
                                    size={48}
                                    viewBox="0 0 48 48"
                                />
                            }
                            noEntityText={
                                <FormattedMessage
                                    id="aquascape.flora_and_fauna.no_plants"
                                    defaultMessage="No plants added"
                                />
                            }
                        />
                        <FloraList
                            entities={aquascapeResult.aquascape.livestock}
                            title={
                                <FormattedMessage
                                    id="aquascape.flora_and_fauna.livestock"
                                    defaultMessage="Livestock"
                                />
                            }
                            icon={
                                <Icon
                                    d={Icon.FISH}
                                    color={colors.WHITE}
                                    size={48}
                                    viewBox="0 0 48 48"
                                />
                            }
                            noEntityText={
                                <FormattedMessage
                                    id="aquascape.flora_and_fauna.no_livestock"
                                    defaultMessage="No livestock added"
                                />
                            }
                        />
                        <FloraList
                            entities={aquascapeResult.aquascape.hardscape}
                            title={
                                <FormattedMessage
                                    id="aquascape.flora_and_fauna.hardscape"
                                    defaultMessage="Hardscape"
                                />
                            }
                            icon={
                                <Icon
                                    d={Icon.STONE}
                                    color={colors.WHITE}
                                    size={48}
                                    viewBox="0 0 48 48"
                                />
                            }
                            noEntityText={
                                <FormattedMessage
                                    id="aquascape.flora_and_fauna.no_hardscape"
                                    defaultMessage="No hardscape added"
                                />
                            }
                        />
                    </FloraSection>
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
