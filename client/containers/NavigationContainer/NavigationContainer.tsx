import React, {useContext, useCallback} from 'react'

import {Navigation} from 'components/molecules'
import {ModalContext} from 'providers/ModalProvider'
import {AuthContext} from 'providers/AuthenticationProvider'

const NavigationContainer = () => {
    const {openModal} = useContext(ModalContext)
    const {isAuthenticated, user} = useContext(AuthContext)
    const openLoginModal = useCallback(() => openModal('login'), [])
    const openRegisterModal = useCallback(() => openModal('register'), [])

    const onCreateAquascape = () => {
        if (isAuthenticated) {
            // TODO: redirect to aquascape creation
        } else {
            openLoginModal()
        }
    }

    return (
        <Navigation
            user={user}
            isAuthenticated={isAuthenticated}
            openLoginModal={openLoginModal}
            openRegisterModal={openRegisterModal}
            onCreateAquascape={onCreateAquascape}
        />
    )
}

export default NavigationContainer
