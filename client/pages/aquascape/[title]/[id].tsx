import React from 'react'

import {App} from 'components/core'
import NavigationContainer from 'containers/Navigation'
import FooterContainer from 'containers/Footer'
import AquascapeDetailsContainer from 'containers/AquascapeDetails'
import withAuth from 'hocs/withAuth'

const AquascapeDetails = () => (
    <App>
        <NavigationContainer />
        <AquascapeDetailsContainer />
        <FooterContainer />
    </App>
)

export default withAuth(AquascapeDetails)