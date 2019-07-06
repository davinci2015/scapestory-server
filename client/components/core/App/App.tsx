import React from 'react'
import {Layout} from 'components/core'
import {LoginModal, RegistrationModal} from 'components/organisms'

type Props = {
    children: React.ReactNode
}

const App = ({children}: Props) => (
    <Layout>
        <LoginModal />
        <RegistrationModal />
        {children}
    </Layout>
)

export default App