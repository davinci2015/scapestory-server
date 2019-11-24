import React from 'react'

import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
import AquascapeDetailsEditContainer from 'containers/AquascapeDetailsEditContainer'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'

const AquascapeDetails = () => (
    <ModalProvider>
        <NavigationContainer />
        <AquascapeDetailsEditContainer />
        <FooterContainer />
    </ModalProvider>
)

export default withAuth(AquascapeDetails)
