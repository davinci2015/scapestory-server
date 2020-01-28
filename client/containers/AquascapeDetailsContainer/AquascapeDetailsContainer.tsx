import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useQuery, useMutation} from 'react-apollo'
import {FormattedMessage} from 'react-intl'
import {Element} from 'react-scroll'

import {AQUASCAPE_DETAILS} from 'containers/AquascapeDetailsContainer/queries'
import {Divider, Icon, Paragraph} from 'components/atoms'
import {Grid, Content, Hide} from 'components/core'
import {SubNavigation, EquipmentCard} from 'components/molecules'
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
import {colors, breakpoints} from 'styles'
import {
    AdditivesCard,
    SubstratesCard,
    LightsCard,
    FiltersCard,
} from 'components/sections/AquascapeDetails/EquipmentSection/Cards'
import {pxToNumber} from 'utils/converter'
import SettingsIcon from 'assets/icons/settings.svg'

const sections = {
    PHOTO_POSTS: 'PHOTO_POSTS',
    FLORA: 'FLORA',
    EQUIPMENT: 'EQUIPMENT',
    COMMENTS: 'COMMENTS',
}

let visited = false

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
            visited = true

            if (data.visitAquascape && !cookie.getVisitorId()) {
                cookie.persistVisitorId(data.visitAquascape.visitor.visitorId)
            }
        }

        if (aquascapeResult && !loading && !visited) visitAquascape()
    }, [aquascapeResult, loading])

    if (error) {
        // TODO: Show error
        return null
    }

    if (!aquascapeResult || !aquascapeResult.aquascape) {
        // TODO: Return not found page
        return null
    }

    const {additives, co2, filters, lights, substrates} = aquascapeResult.aquascape

    const hasEquipment =
        [lights, filters, substrates, additives].some(equipment => !!equipment.length) || co2

    return (
        <Content>
            <HeroSectionContainer aquascape={aquascapeResult.aquascape} />
            <SubNavigation>
                <SubNavigation.Item offset={90} id={sections.PHOTO_POSTS}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.photo"
                            defaultMessage="Photo Diary"
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <Icon d={Icon.CAMERA} />
                    </Hide>
                </SubNavigation.Item>
                <SubNavigation.Item offset={90} id={sections.FLORA}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.flora"
                            defaultMessage="Flora & Fauna"
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <Icon d={Icon.PLANT} viewBox="0 0 48 48" size={42} />
                    </Hide>
                </SubNavigation.Item>
                <SubNavigation.Item offset={90} id={sections.EQUIPMENT}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.equipment"
                            defaultMessage="Equipment"
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <SettingsIcon />
                    </Hide>
                </SubNavigation.Item>
                <SubNavigation.Item offset={90} id={sections.COMMENTS}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.comments"
                            defaultMessage="Comments ({count})"
                            values={{count: aquascapeResult.aquascape.comments.length}}
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <Icon d={Icon.COMMENT} />
                    </Hide>
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
                    <EquipmentSection>
                        {hasEquipment ? (
                            <Grid.Row>
                                {!!filters.length && (
                                    <Grid.Item extraSmall={12} small={6} large={4}>
                                        <FiltersCard>
                                            {filters.map(filter => (
                                                <Paragraph key={filter.id}>
                                                    {filter.brand?.name}
                                                    {filter.model}
                                                </Paragraph>
                                            ))}
                                        </FiltersCard>
                                    </Grid.Item>
                                )}
                                {!!lights.length && (
                                    <Grid.Item extraSmall={12} small={6} large={4}>
                                        <LightsCard>
                                            {lights.map(light => (
                                                <Paragraph key={light.id}>
                                                    {light.brand?.name} {light.model}
                                                </Paragraph>
                                            ))}
                                        </LightsCard>
                                    </Grid.Item>
                                )}
                                {!!substrates.length && (
                                    <Grid.Item extraSmall={12} small={6} large={4}>
                                        <SubstratesCard>
                                            {substrates.map(substrate => (
                                                <Paragraph key={substrate.id}>
                                                    {substrate.brand?.name} {substrate.model}
                                                </Paragraph>
                                            ))}
                                        </SubstratesCard>
                                    </Grid.Item>
                                )}
                                {co2 && co2.type && !!co2.bps && (
                                    <Grid.Item extraSmall={12} small={6} large={4}>
                                        <EquipmentCard
                                            title={
                                                <FormattedMessage
                                                    id="aquascape.equipment.co2"
                                                    defaultMessage="CO2"
                                                />
                                            }
                                            image={
                                                <img
                                                    src="/static/equipment/co2.jpg"
                                                    alt="Aquarium co2"
                                                />
                                            }
                                        >
                                            <Paragraph>
                                                <FormattedMessage
                                                    id="aquascape.equipment.co2.type"
                                                    defaultMessage="Type: {type}"
                                                    values={{type: co2.type}}
                                                />
                                            </Paragraph>
                                            <Paragraph>
                                                <FormattedMessage
                                                    id="aquascape.equipment.co2.type"
                                                    defaultMessage="Bubbles per second: {bps}"
                                                    values={{
                                                        bps: co2.bps.toString(),
                                                    }}
                                                />
                                            </Paragraph>
                                        </EquipmentCard>
                                    </Grid.Item>
                                )}
                                {!!additives.length && (
                                    <Grid.Item extraSmall={12} small={6} large={4}>
                                        <AdditivesCard>
                                            {additives.map(additive => (
                                                <Paragraph key={additive.id}>
                                                    {additive.brand?.name} {additive.model}
                                                </Paragraph>
                                            ))}
                                        </AdditivesCard>
                                    </Grid.Item>
                                )}
                            </Grid.Row>
                        ) : (
                            <Paragraph type="s3" as="span">
                                <FormattedMessage
                                    id="aquascape.equipment.no_equipment"
                                    defaultMessage="No equipment added"
                                />
                            </Paragraph>
                        )}
                    </EquipmentSection>
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
