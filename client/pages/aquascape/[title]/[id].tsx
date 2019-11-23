import React from 'react'

import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
import AquascapeDetailsContainer from 'containers/AquascapeDetailsContainer'
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
