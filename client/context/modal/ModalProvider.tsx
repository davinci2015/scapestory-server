import React, {useState} from 'react'

interface ModalContextInterface {
    modals: {[key in ModalType]: boolean}
    openModal: (type: ModalType) => void
    closeModal: (type: ModalType) => void
    isOpen: (type: ModalType) => boolean
}

const ModalContext = React.createContext<ModalContextInterface>({
    modals: {
        login: false,
        register: false
    },
    openModal: () => {},
    closeModal: () => {},
    isOpen: () => false
})

interface Props {
    children: React.ReactNode
}

export type ModalType = 'login' | 'register'

const initialState = {
    login: false,
    register: false
}

const ModalProvider = ({children}: Props) => {
    const [modals, setModalVisibility] = useState<{[key in ModalType]: boolean}>(initialState)

    const openModal = (type: ModalType) => setModalVisibility({...initialState, [type]: true})

    const closeModal = (type: ModalType) => setModalVisibility({...modals, [type]: false})

    const isOpen = (type: ModalType) => modals[type]

    return (
        <ModalContext.Provider value={{
            modals,
            openModal, 
            closeModal,
            isOpen
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export {ModalContext}

export default ModalProvider