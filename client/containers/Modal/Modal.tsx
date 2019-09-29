import React, {useContext, useEffect} from 'react'
import Router from 'next/router'

import {Modal} from 'components/molecules'
import {ModalContext} from 'context/modal'
import {LoginModal, RegistrationModal, FeedbackModal} from 'components/organisms'

const modalMapping = {
    login: LoginModal,
    register: RegistrationModal,
    feedback: FeedbackModal
}

const ModalContainer = () => {
    const {modalType, closeModal} = useContext(ModalContext)

    const getComponent = () => {
        if (!modalType) return null
        const Component = modalMapping[modalType]
        
        return Component ? <Component /> : null
    }

    useEffect(() => Router.events.on('routeChangeStart', () => {
        closeModal()
    }), [])
    
    return (
        <Modal isOpen={!!modalType} onRequestClose={closeModal}>
            {getComponent()}
        </Modal>
    )
}

export default ModalContainer