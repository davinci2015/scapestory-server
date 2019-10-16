import React from 'react'
import {useRouter} from 'next/router'

import {Grid, Content} from 'components/core'


const AquascapeDetailsContainer = () => {
    const router = useRouter()

    return (
        <Content>
            <Grid>
                <h1>{router.query.id}</h1>
            </Grid>
        </Content>
    )
}

export default AquascapeDetailsContainer