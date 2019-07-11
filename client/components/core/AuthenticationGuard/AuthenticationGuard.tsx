import {useContext} from 'react'
import {AuthContext} from 'hocs/withAuth'

export interface Props {
    children?: React.ReactNode
    render?: (props: {isAuthenticated: boolean}) => React.ReactNode | null
}

// @ts-ignore - tslint is protesting against return null
const AuthenticationGuard: React.FC<Props> = ({children, render}: Props) => {
    const {isAuthenticated} = useContext(AuthContext)

    if (render) return render({isAuthenticated})

    return isAuthenticated ? children : null
}

export default AuthenticationGuard