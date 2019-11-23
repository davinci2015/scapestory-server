import React from 'react'

import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
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
