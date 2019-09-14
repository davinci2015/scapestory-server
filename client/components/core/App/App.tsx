import React from 'react'
import {GlobalStyles} from 'components/core'
import ModalContainer from 'containers/Modal'

type Props = {
    children: React.ReactNode
}

const App = ({children}: Props) => (
    <>
        <GlobalStyles/>
        <ModalContainer/>
        {children}
    </>
)

export default App