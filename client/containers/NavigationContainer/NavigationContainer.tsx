import React, {useContext, useCallback} from 'react'

import {Navigation} from 'components/molecules'
import {ModalContext} from 'providers/ModalProvider'
import {AuthContext} from 'providers/AuthenticationProvider'
import useCreateAquascape from 'hooks/useCreateAquascape'

const NavigationContainer = () => {
    const {openModal} = useContext(ModalContext)
    const {isAuthenticated, user} = useContext(AuthContext)
    const onCreateAquascape = useCreateAquascape()

    const openLoginModal = useCallback(() => openModal('login'), [])
    const openRegisterModal = useCallback(() => openModal('register'), [])

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
