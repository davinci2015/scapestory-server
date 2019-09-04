import React from 'react'
import {Layout} from 'components/core'
import ModalContainer from 'containers/Modal'

type Props = {
    children: React.ReactNode
}

const App = ({children}: Props) => (
    <Layout>
        <ModalContainer/>
        {children}
    </Layout>
)

export default App