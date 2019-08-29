import React, {useContext} from 'react'
import {useQuery} from 'react-apollo-hooks'

import {Navigation} from 'components/molecules'
import {ModalContext} from 'context/modal'
import {AuthenticationGuard} from 'components/core'
import {USER_PROFILE_IMAGE} from 'containers/Navigation/queries'

const NavigationContainer = () => {
    const {openModal} = useContext(ModalContext)
    const {data} = useQuery(USER_PROFILE_IMAGE)
    
    return (
        <AuthenticationGuard render={({isAuthenticated}) => (
            <Navigation
                userImage={data && data.me && data.me.profileImage}
                isAuthenticated={isAuthenticated}
                openModal={openModal}
            />
        )}/>
    )
}

export default NavigationContainer