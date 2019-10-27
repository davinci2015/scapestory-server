import React from 'react'

interface AuthContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: (authenticated: boolean) => void
}

export const AuthContext = React.createContext<AuthContextInterface>({
    isAuthenticated: false,
    setIsAuthenticated: () => new Error('setIsAuthenticated is not implemented')
})