import React, {useState, useEffect} from 'react'
import Router from 'next/router'

import {Modal} from 'components/molecules'
import {LoginModal, RegistrationModal, FeedbackModal} from 'components/modals'

interface Props {
    children: React.ReactNode
}

export type ModalType = 'login' | 'register' | 'feedback'

export interface ModalContextInterface {
    openModal: (type: ModalType, props?: Object) => void
    modalType: ModalType | null,
    modalProps: Object,
    closeModal: VoidFunction
}

export const ModalContext = React.createContext<ModalContextInterface>({
    openModal: () => new Error('openModal is not implemented'),
    closeModal: () => new Error('closeModal is not implemented'),
    modalProps: {},
    modalType: null
})

const modalMapping = {
    login: LoginModal,
    register: RegistrationModal,
    feedback: FeedbackModal
}

const ModalProvider = ({children}: Props) => {
    const [modalType, setModalVisibility] = useState<ModalType | null>(null)
    const [modalProps, setModalProps] = useState<Object>({})

    const getComponent = () => {
        if (!modalType) return null
        const Component = modalMapping[modalType]

        return Component ? <Component {...modalProps} /> : null
    }

    const openModal = (type: ModalType, props?: Object) => {
        if (props) setModalProps(props)
        setModalVisibility(type)
    }

    const closeModal = () => setModalVisibility(null)

    useEffect(() => Router.events.on('routeChangeStart', () => {
        closeModal()
    }), [])

    return (
        <ModalContext.Provider value={{
            openModal,
            closeModal,
            modalProps,
            modalType
        }}>
            {children}
            <Modal isOpen={!!modalType} onRequestClose={closeModal}>
                {getComponent()}
            </Modal>
        </ModalContext.Provider>
    )
}

export default ModalProvider