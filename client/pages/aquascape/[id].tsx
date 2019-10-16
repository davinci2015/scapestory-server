import React from 'react'

import {App} from 'components/core'
import NavigationContainer from 'containers/Navigation'
import FooterContainer from 'containers/Footer'
import AquascapeDetailsContainer from 'containers/AquascapeDetails'

const AquascapeDetails = () => (
    <App>
        <NavigationContainer />
        <AquascapeDetailsContainer />
        <FooterContainer />
    </App>
)

export default AquascapeDetails