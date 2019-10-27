import React from 'react'

export type ModalType = 'login' | 'register' | 'feedback'

export interface ModalContextInterface {
    openModal: (type: ModalType) => void
    modalType: ModalType | null
    closeModal: VoidFunction
}

export const ModalContext = React.createContext<ModalContextInterface>({
    openModal: () => {},
    closeModal: () => {},
    modalType: null
})