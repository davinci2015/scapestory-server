import {useContext} from 'react'

import {FacebookLogin, GoogleLogin, Modal} from 'components/molecules'
import {Headline, Paragraph, FormattedMessage, Bubble, Button, ButtonIcon, Icon} from 'components/atoms'
import {FacebookProps} from 'components/molecules/FacebookLogin'
import {GoogleProps} from 'components/molecules/GoogleLogin'
import {colors, spaces} from 'styles'
import {ModalContext} from 'context/modal'

interface Props {
    authType: 'login' | 'register'
    onSuccess: (token: string) => void
    title: React.ReactNode
    subtitle: React.ReactNode
    footer: React.ReactNode
    form: React.ReactNode
}

const AuthModal = ({
    authType,
    title,
    subtitle,
    footer,
    form,
    onSuccess
}: Props) => {
    const {isOpen, closeModal} = useContext(ModalContext)

    const closeAuthModal = () => closeModal(authType)

    return (
        <>
            <Modal isOpen={isOpen(authType)} onRequestClose={closeAuthModal}>
                <div className="wrapper">
                    <div className="body">
                        <div className="bubble-left">
                            <Bubble size="369px" />
                        </div>
                        <div className="bubble-right">
                            <Bubble size="334px" />
                        </div>
                        <a onClick={closeAuthModal} className="close-button">
                            <Icon d={Icon.CLOSE} color={colors.DARK_GRAY} size={26} />
                        </a>
                        <Headline as="h1" variant="h3">
                            {title}
                        </Headline>
                        <Paragraph as="p" color={colors.DARK_GRAY}>
                            {subtitle}
                        </Paragraph>
                        <div className="form">
                            {form}
                        </div>
                        <div className="social">
                            <div className="social-text">
                                <Paragraph as="span" color={colors.DARK_GRAY}>
                                    <FormattedMessage id="login_social_login_continue" defaultMessage="Or continue with" />
                                </Paragraph>
                            </div>
                            <div className="social-buttons">
                                <GoogleLogin onSuccess={onSuccess}>
                                    {(props: GoogleProps) => (
                                        <Button color="secondary" onClick={() => props.onClick()}>
                                            <ButtonIcon side="left">
                                                <img src="/static/icons/icon-google.png" alt="Google Login" />
                                            </ButtonIcon>
                                            <Paragraph weight="bold" as="span">
                                                Google
                                        </Paragraph>
                                        </Button>
                                    )}
                                </GoogleLogin>
                                <FacebookLogin onSuccess={onSuccess}>
                                    {(props: FacebookProps) => (
                                        <Button color="secondary" onClick={() => props.onClick()}>
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
                            {footer}
                        </Paragraph>
                    </div>
                </div>
            </Modal>

            <style jsx>{`
                .wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                }

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

                .footer :global(a) {
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}

export default AuthModal