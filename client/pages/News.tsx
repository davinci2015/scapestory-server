import React from 'react'

import NavigationContainer from 'containers/Navigation'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'

const News = () => (
    <ModalProvider>
        <NavigationContainer />
        <h1>News page</h1>
    </ModalProvider>
)

export default withAuth(News)