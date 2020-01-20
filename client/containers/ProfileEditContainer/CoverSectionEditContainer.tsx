import React, {useContext} from 'react'
import {useRouter} from 'next/router'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {AuthContext} from 'providers/AuthenticationProvider'
import routes from 'routes'

interface Props {
    user: UserBySlugQuery['user']
}

const CoverSectionContainer: React.FunctionComponent<Props> = ({user}) => {
    const router = useRouter()

    if (!user) return null

    const {isAuthenticated, user: loggedInUser} = useContext(AuthContext)

    if (!isAuthenticated || user.id !== loggedInUser?.id) {
        router.push(routes.profile)
        return null
    }

    return null
}

export default CoverSectionContainer
