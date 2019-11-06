import React from 'react'

import NavigationContainer from 'containers/Navigation'
import FooterContainer from 'containers/Footer'
import HomeContainer from 'containers/Home'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'

const Index = () => (
    <ModalProvider>
        <NavigationContainer />
        <HomeContainer />
        <FooterContainer />
    </ModalProvider>
)

export default withAuth(Index)