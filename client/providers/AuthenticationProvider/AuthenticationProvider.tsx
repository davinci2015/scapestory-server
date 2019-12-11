import React, {useState} from 'react'
import {useQuery} from 'react-apollo'

import {USER_PROFILE} from 'graphql/queries'
import logger from 'services/logger'
import {User_ProfileQuery} from 'graphql/generated/queries'

interface AuthContextInterface {
    isAuthenticated: boolean
    user: User_ProfileQuery['me'] | null
    setAuthenticated: (authenticated: boolean) => void
}

export const AuthContext = React.createContext<AuthContextInterface>({
    isAuthenticated: false,
    user: null,
    setAuthenticated: () => new Error('setAuthenticated is not implemented'),
})

interface Props {
    initialIsAuthenticated?: boolean
    children: React.ReactNode
}

const AuthenticationProvider: React.FunctionComponent<Props> = ({
    children,
    initialIsAuthenticated = false,
}) => {
    const [isAuthenticated, changeIsAuthenticated] = useState(initialIsAuthenticated)
    const {data, error, refetch} = useQuery(USER_PROFILE, {
        errorPolicy: 'ignore',
    })
    console.log(data)
    const user = data ? data.me : null

    if (error) {
        logger.error(error)
    }

    const setAuthenticated = async (authenticated: boolean) => {
        await refetch()
        changeIsAuthenticated(authenticated)
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setAuthenticated,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthenticationProvider
