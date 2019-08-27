import React, {useContext} from 'react'
import {useRouter} from 'next/router'
import {useQuery} from 'react-apollo-hooks'

import {Navigation} from 'components/molecules'
import {ModalContext} from 'context/modal'
import {AuthenticationGuard} from 'components/core'
import {USER_PROFILE_IMAGE} from 'containers/Navigation/queries'

const NavigationContainer = () => {
    const {openModal} = useContext(ModalContext)
    const {data} = useQuery(USER_PROFILE_IMAGE)
    const router = useRouter()
    
    return (
        <AuthenticationGuard render={({isAuthenticated}) => (
            <Navigation
                router={router}
                userImage={data && data.me && data.me.profileImage}
                isAuthenticated={isAuthenticated}
                openModal={openModal}
            />
        )}/>
    )
}

export default NavigationContainer