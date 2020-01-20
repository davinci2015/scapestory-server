import React from 'react'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
import ProfileEditContainer from 'containers/ProfileEditContainer'

const UserProfileEdit = () => (
    <ModalProvider>
        <NavigationContainer />
        <ProfileEditContainer />
        <FooterContainer />
    </ModalProvider>
)

export default withAuth(UserProfileEdit)
