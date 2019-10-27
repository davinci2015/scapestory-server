import React, {useState} from 'react'
import {ModalType, ModalContext} from 'context/modal'

interface Props {
    children: React.ReactNode
}

const ModalProvider = ({children}: Props) => {
    const [modalType, setModalVisibility] = useState<ModalType | null>(null)
    const [modalProps, setModalProps] = useState<Object>({})

    const openModal = (type: ModalType, props?: Object) => {
        if (props) {
            setModalProps(props)
        }
        
        setModalVisibility(type)
    }

    const closeModal = () => setModalVisibility(null)

    return (
        <ModalContext.Provider value={{
            openModal, 
            closeModal,
            modalProps,
            modalType
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider