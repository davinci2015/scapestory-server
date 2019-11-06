import React, {useContext} from 'react'

import {ModalContext} from 'providers/ModalProvider'
import {Footer} from 'components/sections/shared'

const FooterContainer = () => {
    const {openModal} = useContext(ModalContext)
    
    return (
        <Footer openModal={openModal}/>
    )
}

export default FooterContainer