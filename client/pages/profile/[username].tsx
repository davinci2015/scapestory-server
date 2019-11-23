import React from 'react'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'containers/Navigation'
import FooterContainer from 'containers/Footer'
import {Headline} from 'components/atoms'

const UserProfile = () => (
    <ModalProvider>
        <NavigationContainer />
        <Headline>My profile</Headline>
        <FooterContainer />
    </ModalProvider>
)

export default withAuth(UserProfile)
