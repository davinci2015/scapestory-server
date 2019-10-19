import React from 'react'
import {withRouter, Router} from 'next/router'
import {useQuery} from 'react-apollo'

import {AQUASCAPE_DETAILS} from 'containers/AquascapeDetails/query'
import {Grid, Content} from 'components/core'
import HeroSection from 'components/sections/AquascapeDetails/HeroSection'

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
            <Grid>
                <h1>Rest of the page</h1>
            </Grid>
        </Content>
    )
}

export default withRouter(AquascapeDetailsContainer)