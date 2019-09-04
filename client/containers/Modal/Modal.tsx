import React, {useContext} from 'react'

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
    
    return (
        <Modal isOpen={!!modalType} onRequestClose={closeModal}>
            {getComponent()}
        </Modal>
    )
}

export default ModalContainer