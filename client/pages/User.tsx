import React from 'react'
import {useRouter} from 'next/router'
import NavigationContainer from 'containers/NavigationContainer'

const Profile = () => {
    const router = useRouter()

    return (
        <>
            <NavigationContainer />
            <h1>User page {router.query && router.query.username}</h1>
        </>
    )
}

export default Profile
