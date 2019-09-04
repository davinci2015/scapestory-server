import React, {useState} from 'react'

interface ModalContextInterface {
    openModal: (type: ModalType) => void
    modalType: ModalType | null
    closeModal: VoidFunction
}

export type ModalType = 'login' | 'register' | 'feedback'

const ModalContext = React.createContext<ModalContextInterface>({
    openModal: () => {},
    closeModal: () => {},
    modalType: null
})

interface Props {
    children: React.ReactNode
}

const ModalProvider = ({children}: Props) => {
    const [modalType, setModalVisibility] = useState<ModalType | null>(null)

    const openModal = (type: ModalType) => setModalVisibility(type)

    const closeModal = () => setModalVisibility(null)

    return (
        <ModalContext.Provider value={{
            openModal, 
            closeModal,
            modalType
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export {ModalContext}

export default ModalProvider