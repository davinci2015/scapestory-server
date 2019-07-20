import React from 'react'

import routes, {routeMapping} from 'routes'
import * as styles from 'styles'
import {ModalType} from 'context/modal'
import useScrollPosition from 'hooks/useScrollPosition'
import {Button, FormattedMessage, Icon, UserImage, Paragraph} from 'components/atoms'

import NavLink from './NavLink'

interface Props {
    isAuthenticated: boolean
    userImage: string
    openModal: (modalType: ModalType) => void
}

const scrollOffset = 80

const Navigation = ({
    isAuthenticated,
    openModal,
    userImage,
}: Props) => {
    const position = useScrollPosition()

    const isSlim = () => position.y > scrollOffset

    const openLoginModal = () => openModal('login')

    const openRegisterModal = () => openModal('register')

    const onCreateAquascape = () => {
        if (isAuthenticated) {
            // TODO: redirect to aquascape creation
        } else {
            openLoginModal()
        }
    }

    return (
        <nav>
            <div className="container">
                <div className="left">
                    <img className="logo" src="/static/logo.svg" />
                    <NavLink href={routes.index}>
                        <a>Discover</a>
                    </NavLink>
                    <NavLink href={routes.news}>
                        <a>Newsfeed</a>
                    </NavLink>
                </div>
                <div className="right">
                    {
                        !isAuthenticated &&
                        <>
                            <div className="text">
                                <Paragraph as="span" color={styles.colors.SHADE_DEEP}>
                                    <FormattedMessage id="navigation_not_member_yet" defaultMessage="Not a member yet?" />
                                </Paragraph>
                                <div className="signup" onClick={openRegisterModal}>
                                    <Paragraph as="span" color={styles.colors.PRIMARY} weight="bold">
                                        <FormattedMessage id="navigation_sign_up" defaultMessage="Sign Up" />
                                    </Paragraph>
                                </div>
                            </div>
                            <div className="login-btn">
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    type="small"
                                    onClick={openLoginModal}
                                >
                                    <FormattedMessage id="navigation_login" defaultMessage="Login" />
                                </Button>
                            </div>
                        </>
                    }
                    <Button
                        type="small"
                        onClick={onCreateAquascape}
                        leftIcon={<Icon d={Icon.ADD_FULL} viewBox="0 0 22 22" color={styles.colors.WHITE} />}
                    >
                        <FormattedMessage id="navigation_add_your_aquascape" defaultMessage="Add your aquascape" />
                    </Button>
                    {
                        isAuthenticated &&
                        <NavLink as={routeMapping.user.as('test')} href={routeMapping.user.href('test')}>
                            <div>
                                <UserImage size="l" image={userImage} />
                            </div>
                        </NavLink>
                    }
                </div>
            </div>

            <style jsx>{`
            nav {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 94px;   
                
                background-color: ${styles.colors.WHITE};
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: height 180ms ease-in-out;

                ${isSlim() ? `
                    height: 66px;
                ` : ''}
            }
            
            .container {
                height: 100%;
                margin: 0 auto;
                padding: 0 24px 0 60px;
                
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .logo {
                padding-right: 60px;
            }

            .right, .left {
                display: flex;
                align-items: center;
                height: 100%;
            }

            .right :global(.${UserImage.classes.root}) {
                flex: 0 0 auto;
                margin: 0 ${styles.spaces.s36};
                cursor: pointer;
            }

            .right .login-btn {
                flex: 0;
                margin-right: ${styles.spaces.s24};
                margin-left: ${styles.spaces.s36};
            }

            .right .text {
                flex: 1 1 100%;
            }

            .right .text .signup {
                display: inline;
                margin-left: ${styles.spaces.s6};
                cursor: pointer;
            }
        `}</style>
        </nav>
    )
}

Navigation.NavLink = NavLink

export default Navigation