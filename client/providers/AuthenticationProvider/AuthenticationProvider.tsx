import React from 'react'
import {useQuery} from 'react-apollo'

import {USER_PROFILE} from 'graphql/queries'
import logger from 'services/logger'
import {User_ProfileQuery} from 'graphql/generated/queries'

interface AuthContextInterface {
    isAuthenticated: boolean
    user?: User_ProfileQuery['me']
    setAuthenticated: (authenticated: boolean) => void
}

export const AuthContext = React.createContext<AuthContextInterface>({
    isAuthenticated: false,
    user: null,
    setAuthenticated: () => new Error('setAuthenticated is not implemented'),
})

interface Props {
    children: React.ReactNode
}

const AuthenticationProvider: React.FunctionComponent<Props> = ({children}) => {
    const {data, error, refetch} = useQuery(USER_PROFILE, {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
    })

    if (error) logger.error(error)

    const user = data?.me

    const setAuthenticated = () => {
        refetch()
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: Boolean(user),
                setAuthenticated,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthenticationProvider
