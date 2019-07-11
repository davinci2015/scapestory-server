import React, {useContext} from 'react'

import routes, {routeMapping} from 'routes'
import * as styles from 'styles'
import {ModalContext} from 'context/modal'
import {AuthenticationGuard} from 'components/core'

import NavLink from './NavLink'

const Navigation = () => {
    const {openModal} = useContext(ModalContext)

    return (
        <nav>
            <div className="container">
                <div>
                    <NavLink href={routes.index}>
                        <a>Home</a>
                    </NavLink>
                    <NavLink href={routes.news}>
                        <a>News</a>
                    </NavLink>
                </div>
                <div>
                    <AuthenticationGuard render={({isAuthenticated}) =>
                        !isAuthenticated
                            ? (<button onClick={() => openModal('login')}>Login</button>)
                            : null}
                    />
                    <AuthenticationGuard>
                        <NavLink as={routeMapping.user.as('test')} href={routeMapping.user.href('test')}>
                            <a>Profile</a>
                        </NavLink>
                    </AuthenticationGuard>
                </div>
            </div>

            <style jsx>{`
            nav {
                width: 100%;
                height: 64px;   
                background-color: ${styles.colors.WHITE};
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
            }
            
            .container {
                max-width: 70%;
                height: 100%;
                display: flex;
                margin: 0 auto;
                align-items: center;
                justify-content: space-between;
            }
        `}</style>

        </nav>
    )
}

Navigation.NavLink = NavLink
export default Navigation