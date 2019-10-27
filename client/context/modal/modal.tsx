import React from 'react'

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