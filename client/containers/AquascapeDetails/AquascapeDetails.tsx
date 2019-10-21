import React from 'react'
import {withRouter, Router} from 'next/router'
import {useQuery} from 'react-apollo'
import {FormattedMessage} from 'react-intl'
import {Element} from 'react-scroll'

import {AQUASCAPE_DETAILS} from 'containers/AquascapeDetails/query'
import {Divider} from 'components/atoms'
import {Grid, Content} from 'components/core'
import {SubNavigation} from 'components/molecules'
import {Plant, Livestock, Hardscape, Light, Filter, Substrate, Additive, Co2} from 'generated/graphql'
import {HeroSection, FloraSection, EquipmentSection} from 'components/sections/AquascapeDetails'

export type AquascapeDetailsPlant = Pick<Plant, 'id' | 'name'>

export type AquascapeDetailsLivestock = Pick<Livestock, 'id' | 'name'>

export type AquascapeDetailsHardscape = Pick<Hardscape, 'id' | 'name'>

export type AquascapeDetailsLight = Pick<Light, 'id' | 'brand' | 'model'>

export type AquascapeDetailsFilter = Pick<Filter, 'id' | 'brand' | 'model'>

export type AquascapeDetailsSubstrate = Pick<Substrate, 'id' | 'brand' | 'name'>

export type AquascapeDetailsAdditive = Pick<Additive, 'id' | 'brand' | 'name'>

export type AquascapeDetailsCo2 = Pick<Co2, 'id' | 'type' | 'bps'>

interface Props {
    router: Router
}

const sections = {
    PHOTO_POSTS: 'PHOTO_POSTS',
    FLORA: 'FLORA',
    EQUIPMENT: 'EQUIPMENT',
    COMMENTS: 'COMMENTS'
}

const AquascapeDetailsContainer: React.FunctionComponent<Props> = ({router}) => {
    const id = router.query.id
    const {data, error, loading} = useQuery(AQUASCAPE_DETAILS, {variables: {id: Number(id)}})

    if (loading) {
        // TODO: Show loader
        return null
    }

    if (error) {
        // TODO: Show error
        return null
    }

    if (data && data.aquascape === null) {
        // TODO: Return not found page
        return null
    }

    const hasEquipment = ['lights', 'filters', 'substrates', 'additives']
        .some(equipment => data.aquascape[equipment] && data.aquascape[equipment].length) || data.aquascape.co2

    return (
        <Content>
            <HeroSection aquascape={data.aquascape} />
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
            </Grid>
        </Content>
    )
}

export default withRouter(AquascapeDetailsContainer)