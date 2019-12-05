import React from 'react'
import Link from 'next/link'
import classnames from 'classnames'

import * as styles from 'styles'
import useScrollPosition from 'hooks/useScrollPosition'
import {Button, FormattedMessage, Icon, UserImage, Paragraph} from 'components/atoms'

import NavLink from './NavLink'
import routes, {createDynamicPath} from 'routes'
import {User_ProfileQuery} from 'graphql/generated/queries'

interface Props {
    user: User_ProfileQuery['me'] | null
    isAuthenticated: boolean
    openLoginModal: () => void
    openRegisterModal: () => void
    onCreateAquascape: () => void
}

export const navigationHeight = {
    DEFAULT: '94px',
    SLIM: '66px',
}

const scrollOffset = 80

const Navigation = ({
    user,
    isAuthenticated,
    openLoginModal,
    openRegisterModal,
    onCreateAquascape,
}: Props) => {
    const {position} = useScrollPosition()
    const isSlim = position.y > scrollOffset

    return (
        <nav
            className={classnames('nav', {
                'nav--slim': isSlim,
            })}
        >
            <div className="container">
                <div className="left">
                    <Link href={routes.index}>
                        <a>
                            <img src="/static/logo.svg" />
                        </a>
                    </Link>
                    <NavLink href={routes.index}>
                        <a>
                            <FormattedMessage id="navigation_discover" defaultMessage="Discover" />
                        </a>
                    </NavLink>
                </div>
                <div className="right">
                    {!isAuthenticated && (
                        <>
                            <div className="text">
                                <Paragraph as="span" color={styles.colors.SHADE_DEEP}>
                                    <FormattedMessage
                                        id="navigation_not_member_yet"
                                        defaultMessage="Not a member yet?"
                                    />
                                </Paragraph>
                                <div className="signup" onClick={openRegisterModal}>
                                    <Paragraph
                                        as="span"
                                        color={styles.colors.PRIMARY}
                                        weight="bold"
                                    >
                                        <FormattedMessage
                                            id="navigation_sign_up"
                                            defaultMessage="Sign Up"
                                        />
                                    </Paragraph>
                                </div>
                            </div>
                            <div className="login-btn">
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    dimensions="small"
                                    onClick={openLoginModal}
                                >
                                    <FormattedMessage
                                        id="navigation_login"
                                        defaultMessage="Login"
                                    />
                                </Button>
                            </div>
                        </>
                    )}
                    <Button
                        dimensions="small"
                        onClick={onCreateAquascape}
                        leftIcon={
                            <Icon
                                d={Icon.ADD_FULL}
                                viewBox="0 0 22 22"
                                color={styles.colors.WHITE}
                            />
                        }
                    >
                        <FormattedMessage
                            id="navigation_add_your_aquascape"
                            defaultMessage="Add your aquascape"
                        />
                    </Button>
                    {isAuthenticated && user && (
                        <NavLink
                            as={createDynamicPath(routes.profile, {slug: user.slug})}
                            href={routes.profile}
                        >
                            <div>
                                <UserImage size="large" image={user.profileImage} />
                            </div>
                        </NavLink>
                    )}
                </div>
            </div>

            <style jsx>{`
                .nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: ${navigationHeight.DEFAULT};

                    z-index: ${styles.zIndex.MEDIUM};
                    background-color: ${styles.colors.WHITE};
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                    transition: height 180ms ease-in-out;
                }

                .nav--slim {
                    height: ${navigationHeight.SLIM};
                }

                .container {
                    height: 100%;
                    margin: 0 auto;
                    padding: 0 24px 0 60px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .left :global(img) {
                    padding-right: 60px;
                }

                .right,
                .left {
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
