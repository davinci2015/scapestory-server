import React, {useContext, useCallback} from 'react'
import {useMutation} from 'react-apollo'
import {useRouter} from 'next/router'

import {Navigation} from 'components/molecules'
import {ModalContext} from 'providers/ModalProvider'
import {AuthContext} from 'providers/AuthenticationProvider'
import {CREATE_AQUASCAPE} from 'graphql/mutations'
import logger from 'services/logger'
import {CreateAquascapeMutation} from 'graphql/generated/mutations'
import routes, {createDynamicPath} from 'routes'
import config from 'config'

const NavigationContainer = () => {
    const {openModal} = useContext(ModalContext)
    const router = useRouter()
    const {isAuthenticated, user} = useContext(AuthContext)
    const openLoginModal = useCallback(() => openModal('login'), [])
    const openRegisterModal = useCallback(() => openModal('register'), [])
    const [createAquascapeMutation] = useMutation<CreateAquascapeMutation>(CREATE_AQUASCAPE)

    const onCreateAquascape = () => {
        if (!isAuthenticated) {
            openRegisterModal()
            return
        }

        createAquascapeMutation()
            .then(result => {
                const id = result.data?.createAquascape.id
                if (!id) return

                router.push(
                    createDynamicPath(routes.aquascapeDetailsEdit, {
                        id: id.toString(),
                        title: config.EDIT_AQUASCAPE_URL_TITLE_PLACEHOLDER,
                    })
                )
            })
            .catch(err => logger.error(err))
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
