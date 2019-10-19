import React from 'react'
import {withRouter, Router} from 'next/router'
import {useQuery} from 'react-apollo'

import {AQUASCAPE_DETAILS} from 'containers/AquascapeDetails/query'
import {Divider} from 'components/atoms'
import {Grid, Content} from 'components/core'
import {SubNavigation} from 'components/molecules'
import HeroSection from 'components/sections/AquascapeDetails/HeroSection'
import FloraSection from 'components/sections/AquascapeDetails/FloraSection'
import {Plant, Livestock, Hardscape} from 'generated/graphql'
import EquipmentSection from 'components/sections/AquascapeDetails/EquipmentSection';


export type AquascapeDetailsPlant = Pick<Plant, 'id' | 'name'>

export type AquascapeDetailsLivestock = Pick<Livestock, 'id' | 'name'>

export type AquascapeDetailsHardscape = Pick<Hardscape, 'id' | 'name'>

interface Props {
    router: Router
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

    return (
        <Content>
            <HeroSection aquascape={data.aquascape} />
            <SubNavigation>
                <SubNavigation.Item active>
                    Photo Posts
                </SubNavigation.Item>
                <SubNavigation.Item active={false}>
                    Flora & Fauna
                </SubNavigation.Item>
                <SubNavigation.Item active={false}>
                    Equipment
                </SubNavigation.Item>
                <SubNavigation.Item active={false}>
                    Comments(22)
                </SubNavigation.Item>
            </SubNavigation>
            <Grid>
                <Divider />
                <FloraSection
                    plants={data.aquascape.plants}
                    livestock={data.aquascape.livestock}
                    hardscape={data.aquascape.hardscape}
                />
                <Divider />
                <EquipmentSection />
                <Divider />
            </Grid>
        </Content>
    )
}

export default withRouter(AquascapeDetailsContainer)