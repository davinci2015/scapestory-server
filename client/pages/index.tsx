import * as React from 'react'

import {App} from 'components/core'
import withAuth from 'hocs/withAuth'
import NavigationContainer from 'containers/Navigation'
import FooterContainer from 'containers/Footer'
import HomeContainer from 'containers/Home'

const Index = () => (
    <App>
        <NavigationContainer />
        <HomeContainer/>
        <FooterContainer/>
    </App>
)

export default withAuth(Index)