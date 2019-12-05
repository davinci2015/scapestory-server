import React from 'react'

import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'containers/NavigationContainer'

const News = () => (
    <ModalProvider>
        <NavigationContainer />
        <h1>News page</h1>
    </ModalProvider>
)

export default withAuth(News)
