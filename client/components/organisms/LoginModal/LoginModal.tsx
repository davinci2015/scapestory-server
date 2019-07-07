import {useContext} from 'react'

import {LoginForm} from 'components/organisms'
import {FacebookLogin, GoogleLogin, Modal} from 'components/molecules'
import {Headline, Paragraph, FormattedMessage, Bubble, Button, ButtonIcon, Icon} from 'components/atoms'
import {FacebookProps} from 'components/molecules/FacebookLogin'
import {GoogleProps} from 'components/molecules/GoogleLogin'
import {colors, spaces} from 'styles'
import {ModalContext} from 'context/modal'

const LoginModal = () => {
    const {isOpen, closeModal, openModal} = useContext(ModalContext)

    const closeLoginModal = () => closeModal('login')

    const openRegistrationModal = () => openModal('register')

    return (
        <>
            <Modal isOpen={isOpen('login')} onRequestClose={closeLoginModal}>
                <div className="body">
                    <div className="bubble-left">
                        <Bubble size="369px" />
                    </div>
                    <div className="bubble-right">
                        <Bubble size="334px" />
                    </div>
                    <a onClick={closeLoginModal} className="close-button">
                        <Icon d={Icon.CLOSE} color={colors.DARK_GRAY} size={26} />
                    </a>
                    <Headline as="h1" variant="h3">
                        <FormattedMessage id="login_title" defaultMessage="Welcome back! Your scapestory is waiting." />
                    </Headline>
                    <Paragraph as="p" color={colors.DARK_GRAY}>
                        <FormattedMessage id="login_subtitle" defaultMessage="Login and continue exploring aquascapes." />
                    </Paragraph>
                    <div className="form">
                        <LoginForm />
                    </div>
                    <div className="social">
                        <div className="social-text">
                            <Paragraph as="span" color={colors.DARK_GRAY}>
                                <FormattedMessage id="login_social_login_continue" defaultMessage="Or continue with" />
                            </Paragraph>
                        </div>
                        <div className="social-buttons">
                            <GoogleLogin>
                                {(props: GoogleProps) => (
                                    <Button color="secondary" onClick={() => {
                                        closeLoginModal()
                                        props.onClick()
                                    }}>
                                        <ButtonIcon side="left">
                                            <img src="/static/icons/icon-google.png" alt="Google Login" />
                                        </ButtonIcon>
                                        <Paragraph weight="bold" as="span">
                                            Google
                                        </Paragraph>
                                    </Button>
                                )}
                            </GoogleLogin>
                            <FacebookLogin>
                                {(props: FacebookProps) => (
                                    <Button color="secondary" onClick={() => {
                                        closeLoginModal()
                                        props.onClick()
                                    }}>
                                        <ButtonIcon side="left">
                                            <img src="/static/icons/icon-facebook.png" alt="Facebook Login" />
                                        </ButtonIcon>
                                        <Paragraph weight="bold" as="span">
                                            Facebook
                                        </Paragraph>
                                    </Button>
                                )}
                            </FacebookLogin>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Paragraph as="span" color={colors.SHADE_DEEP}>
                        <FormattedMessage id="login_footer_not_member" defaultMessage="Not a member yet?" />
                        {' '}
                        <a onClick={openRegistrationModal} className="">
                            <Paragraph as="span" color={colors.PRIMARY} weight="bold">
                                <FormattedMessage id="login_footer_sign_up" defaultMessage="Sign up" />
                            </Paragraph>
                        </a>
                    </Paragraph>
                </div>
            </Modal>

            <style jsx>{`
                .body {
                    padding: ${spaces.s60} 96px 0 96px;
                    position: relative;
                    overflow-x: hidden;
                }

                .form {
                    margin-top: ${spaces.s42};
                    margin-bottom: ${spaces.s24};
                }

                .close-button {
                    cursor: pointer;
                    position: absolute;
                    top: ${spaces.s18};
                    right: ${spaces.s18};
                    padding: ${spaces.s6};
                }

                .bubble-left > :global(.bubble) {
                    position: absolute;
                    left: -40%;
                    top: 0;
                }

                .bubble-right > :global(.bubble) {
                    position: absolute;
                    right: -35%;
                    top: 50%;
                }

                .social {
                    text-align: center;
                    margin-bottom: ${spaces.s54};
                }

                .social-text {
                    margin: ${spaces.s24} 0;
                }

                .social-buttons {
                    display: flex;
                    justify-content: space-between;
                }

                .social-buttons img {
                    width: 100%;
                }

                .social-buttons > :global(.button):first-of-type {
                    margin-right: ${spaces.s30};
                }
                    
                .footer {
                    text-align: center;
                    padding: ${spaces.s24};
                    margin: 0 ${spaces.s6};
                    border-top: 1px solid ${colors.SHADE_LIGHT};
                }

                .footer a {
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}

export default LoginModal