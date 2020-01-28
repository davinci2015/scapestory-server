import React from 'react'
import Link from 'next/link'
import classnames from 'classnames'

import * as styles from 'styles'
import useScrollPosition from 'hooks/useScrollPosition'
import {Button, FormattedMessage, UserImage, Paragraph} from 'components/atoms'

import NavLink from './NavLink'
import routes, {createDynamicPath} from 'routes'
import {User_ProfileQuery} from 'graphql/generated/queries'
import {UserImageSize} from 'components/atoms/UserImage/UserImage'
import {media, spaces, breakpoints} from 'styles'
import {Hide} from 'components/core'
import {pxToNumber} from 'utils/converter'
import AddAquascapeButton from '../AddAquascapeButton'

interface Props {
    user?: User_ProfileQuery['me']
    isAuthenticated: boolean
    openLoginModal: VoidFunction
    openRegisterModal: VoidFunction
    onCreateAquascape: VoidFunction
}

export const navigationHeight = {
    DEFAULT: '94px',
    SLIM: '66px',
}

const scrollOffset = 80

const Navigation = ({
    isAuthenticated,
    onCreateAquascape,
    openLoginModal,
    openRegisterModal,
    user,
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
                            <picture>
                                <source
                                    media={`(min-width: ${breakpoints.medium})`}
                                    srcSet="/static/logo.svg"
                                />
                                <img src="/static/logo-simple.svg" alt="Scapestory" />
                            </picture>
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
                            <Hide upTo={pxToNumber(breakpoints.medium)}>
                                <div className="text">
                                    <Paragraph as="span" color={styles.colors.SHADE_DEEP}>
                                        <FormattedMessage
                                            id="navigation.already_member"
                                            defaultMessage="Already a member?"
                                        />
                                    </Paragraph>
                                    <div className="signup" onClick={openLoginModal}>
                                        <Paragraph
                                            as="span"
                                            color={styles.colors.PRIMARY}
                                            weight="bold"
                                        >
                                            <FormattedMessage
                                                id="navigation.login"
                                                defaultMessage="Login"
                                            />
                                        </Paragraph>
                                    </div>
                                </div>
                            </Hide>
                            <div className="sign-up-btn">
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    dimensions="small"
                                    onClick={openRegisterModal}
                                >
                                    <FormattedMessage
                                        id="navigation.sign_up"
                                        defaultMessage="Sign Up"
                                    />
                                </Button>
                            </div>
                        </>
                    )}

                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <AddAquascapeButton onClick={onCreateAquascape} />
                    </Hide>

                    {isAuthenticated && user && (
                        <NavLink
                            as={createDynamicPath(routes.profile, {slug: user.slug})}
                            href={routes.profile}
                        >
                            <div>
                                <UserImage size={UserImageSize.s36} image={user.profileImage} />
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
                    padding: 0 ${spaces.s18};

                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .left :global(img) {
                    padding-right: ${spaces.s8};
                    width: 41px;
                }

                .right,
                .left {
                    display: flex;
                    align-items: center;
                    height: 100%;
                }

                .right :global(.${UserImage.classes.root}) {
                    flex: 0 0 auto;
                    margin-left: ${spaces.s18};
                    cursor: pointer;
                }

                .right .sign-up-btn {
                    flex: 0;
                    margin-left: ${styles.spaces.s12};
                    margin-right: ${styles.spaces.s12};
                }

                .right .text {
                    flex: 1 1 100%;
                }

                .right .text .signup {
                    display: inline;
                    margin-left: ${styles.spaces.s6};
                    cursor: pointer;
                }

                @media ${media.up('medium')} {
                    .container {
                        padding: 0 ${spaces.s24} 0 ${spaces.s60};
                    }

                    .left :global(img) {
                        padding-right: ${spaces.s60};
                        width: auto;
                    }

                    .right .sign-up-btn {
                        margin-right: ${styles.spaces.s24};
                        margin-left: ${styles.spaces.s36};
                    }

                    .right :global(.${UserImage.classes.root}) {
                        flex: 0 0 auto;
                        margin: 0 ${styles.spaces.s36};
                        cursor: pointer;
                    }
                }
            `}</style>
        </nav>
    )
}

Navigation.NavLink = NavLink

export default Navigation
