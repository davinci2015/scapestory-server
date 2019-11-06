import React, {useState} from 'react'
import {useQuery} from 'react-apollo'

import {USER_PROFILE, UserProfile} from 'graphql/queries'
import logger from 'services/logger'

interface AuthContextInterface {
    isAuthenticated: boolean
    user: UserProfile | null
    setAuthenticated: (authenticated: boolean) => void
}

export const AuthContext = React.createContext<AuthContextInterface>({
    isAuthenticated: false,
    user: null,
    setAuthenticated: () => new Error('setAuthenticated is not implemented')
})

interface Props {
    initialIsAuthenticated?: boolean
    children: React.ReactNode
}

const AuthenticationProvider: React.FunctionComponent<Props>  = ({children, initialIsAuthenticated = false}) => {
    const [isAuthenticated, changeIsAuthenticated] = useState(initialIsAuthenticated)
    const {data, error, refetch} = useQuery(USER_PROFILE, {ssr: false})
    const user = data ? data.me : null

    if (error) {
        logger.error(error)
    }

    const setAuthenticated = (authenticated: boolean) => {
        changeIsAuthenticated(authenticated)
        refetch()
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setAuthenticated,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthenticationProvider