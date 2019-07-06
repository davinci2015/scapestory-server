import React from 'react'
import {Layout} from 'components/core'
import {LoginModal} from 'components/organisms'

type Props = {
    children: React.ReactNode
}

const App = ({children}: Props) => (
    <Layout>
        <LoginModal />
        {children}
    </Layout>
)

export default App