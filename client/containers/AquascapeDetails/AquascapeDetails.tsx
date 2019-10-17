import React from 'react'
import {withRouter, Router} from 'next/router'
import {useQuery} from 'react-apollo'

import {AQUASCAPE_DETAILS} from 'containers/AquascapeDetails/query'
import {Grid, Content} from 'components/core'
import HeroSection from 'components/organisms/Home/HeroSection';

interface Props {
    router: Router
}

const AquascapeDetailsContainer = ({router}: Props) => {
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
            <Grid>
                <HeroSection aquascape={data.aquascape} />
            </Grid>
        </Content>
    )
}

export default withRouter(AquascapeDetailsContainer)