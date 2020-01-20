import React from 'react'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
import ProfileContainer from 'containers/ProfileContainer'

const UserProfileEdit = () => (
    <ModalProvider>
        <NavigationContainer />
        <ProfileContainer />
        <FooterContainer />
    </ModalProvider>
)

export default withAuth(UserProfileEdit)
