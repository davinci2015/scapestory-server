import React from 'react'

import routes, {routeMapping} from 'routes'
import * as styles from 'styles'
import {ModalType} from 'context/modal'
import {Button, FormattedMessage, Icon, UserImage} from 'components/atoms'

import NavLink from './NavLink'

interface Props {
    isAuthenticated: boolean
    userImage: string
    openModal: (modalType: ModalType) => void
}

const Navigation = ({
    isAuthenticated,
    openModal,
    userImage,
}: Props) => (
        <nav>
            <div className="container">
                <div>
                    <NavLink href={routes.index}>
                        <a>Discover</a>
                    </NavLink>
                    <NavLink href={routes.news}>
                        <a>Newsfeed</a>
                    </NavLink>
                </div>
                <div className="right">
                    {
                        !isAuthenticated
                            ? <button onClick={() => openModal('login')}>Login</button>
                            : null
                    }
                    {
                        isAuthenticated &&
                        <NavLink as={routeMapping.user.as('test')} href={routeMapping.user.href('test')}>
                            <UserImage size="l" image={userImage} />
                        </NavLink>
                    }
                    <Button
                        type="small"
                        leftIcon={<Icon d={Icon.ADD_FULL} viewBox="0 0 22 22" color={styles.colors.WHITE} />}>
                        <FormattedMessage id="navigation_add_your_aquascapoe" defaultMessage="Add your aquascape" />
                    </Button>
                </div>
            </div>

            <style jsx>{`
            nav {
                width: 100%;
                height: 94px;   
                background-color: ${styles.colors.WHITE};
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
            }
            
            .container {
                height: 100%;
                margin: 0 auto;
                padding: 0 60px;
                
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .right {
                display: flex;
                align-items: center;
            }

            .right :global(.user-image) {
                flex: 0 0 auto;
                margin: 0 ${styles.spaces.s36};
            }
        `}</style>
        </nav>
    )

Navigation.NavLink = NavLink

export default Navigation