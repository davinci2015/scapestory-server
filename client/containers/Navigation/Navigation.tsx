import React, {useContext, useEffect} from 'react'
import {useQuery} from '@apollo/react-hooks'

import {Navigation} from 'components/molecules'
import {ModalContext} from 'context/modal'
import {AuthenticationGuard} from 'components/core'
import {USER_PROFILE} from 'graphql/queries'
import {AuthContext} from 'context/auth'
import logger from 'services/logger'

const NavigationContainer = () => {
    const {isAuthenticated} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)
    const {data, error, refetch} = useQuery(USER_PROFILE, {ssr: false})

    if (error) {
        logger.info(error)
    }

    useEffect(() => {
        refetch()
    }, [isAuthenticated])

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