import React from 'react'

import NavigationContainer from 'containers/Navigation'
import FooterContainer from 'containers/Footer'
import AquascapeDetailsContainer from 'containers/AquascapeDetails'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'

const AquascapeDetails = () => (
    <ModalProvider>
        <NavigationContainer />
        <AquascapeDetailsContainer />
        <FooterContainer />
    </ModalProvider>
)

export default withAuth(AquascapeDetails)