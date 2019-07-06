import React, {useState} from 'react'

interface ModalContextInterface {
    modals: {[key in ModalTypes]: boolean}
    openModal: (type: ModalTypes) => void
    closeModal: (type: ModalTypes) => void
    isOpen: (type: ModalTypes) => boolean
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

type ModalTypes = 'login' | 'register'

const initialState = {
    login: false,
    register: false
}

const ModalProvider = ({children}: Props) => {
    const [modals, setModalVisibility] = useState<{[key in ModalTypes]: boolean}>(initialState)

    const openModal = (type: ModalTypes) => setModalVisibility({...initialState, [type]: true})

    const closeModal = (type: ModalTypes) => setModalVisibility({...modals, [type]: false})

    const isOpen = (type: ModalTypes) => modals[type]

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