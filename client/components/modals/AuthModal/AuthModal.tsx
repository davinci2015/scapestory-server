import React, {useContext} from 'react'

import {FacebookLogin, GoogleLogin} from 'components/molecules'
import {Headline, Paragraph, Bubble, Button, Icon} from 'components/atoms'
import {FacebookProps} from 'components/molecules/FacebookLogin'
import {GoogleProps} from 'components/molecules/GoogleLogin'
import {colors, spaces, media} from 'styles'
import {ModalContext} from 'providers/ModalProvider'

interface Props {
    onSuccess: (token: string) => void
    title: React.ReactNode
    subtitle: React.ReactNode
    footer: React.ReactNode
    form: React.ReactNode
    socialText?: React.ReactNode
}

const AuthModal = ({footer, form, onSuccess, socialText, subtitle, title}: Props) => {
    const {closeModal} = useContext(ModalContext)

    return (
        <>
            <div className="wrapper">
                <div className="body">
                    <div className="bubble-left">
                        <Bubble size="369px" />
                    </div>
                    <div className="bubble-right">
                        <Bubble size="334px" />
                    </div>
                    <a onClick={closeModal} className="close-button">
                        <Icon d={Icon.CLOSE} color={colors.DARK_GRAY} size={26} />
                    </a>
                    <Headline as="h1" variant="h3">
                        {title}
                    </Headline>
                    <div className="subtitle">
                        <Paragraph as="p" color={colors.DARK_GRAY}>
                            {subtitle}
                        </Paragraph>
                    </div>
                    <div className="social-buttons">
                        <GoogleLogin onSuccess={onSuccess}>
                            {(props: GoogleProps) => (
                                <Button
                                    type="block"
                                    leftIcon={
                                        <img
                                            src="/static/icons/icon-google.png"
                                            alt="Google Login"
                                        />
                                    }
                                    color="secondary"
                                    onClick={props.onClick}
                                >
                                    <Paragraph weight="bold" as="span">
                                        Google
                                    </Paragraph>
                                </Button>
                            )}
                        </GoogleLogin>
                        <FacebookLogin onSuccess={onSuccess}>
                            {(props: FacebookProps) => (
                                <Button
                                    type="block"
                                    leftIcon={
                                        <img
                                            src="/static/icons/icon-facebook.png"
                                            alt="Facebook Login"
                                        />
                                    }
                                    color="secondary"
                                    onClick={props.onClick}
                                >
                                    <Paragraph weight="bold" as="span">
                                        Facebook
                                    </Paragraph>
                                </Button>
                            )}
                        </FacebookLogin>
                    </div>
                    {socialText && (
                        <div className="social-text social-text--small">{socialText}</div>
                    )}
                    <div className="form">{form}</div>
                </div>
                <div className="footer">
                    <Paragraph as="span" color={colors.SHADE_DEEP}>
                        {footer}
                    </Paragraph>
                </div>
            </div>

            <style jsx>{`
                .wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                }

                .body {
                    height: 100%;
                    padding: ${spaces.s36} ${spaces.s12} 0 ${spaces.s12};
                    position: relative;
                    overflow-x: hidden;
                }

                .body :global(.${Headline.classes.root}) {
                    padding-right: ${spaces.s42};
                }

                @media ${media.up('small')} {
                    .body {
                        padding: ${spaces.s60} 96px 0 96px;
                    }

                    .body :global(.${Headline.classes.root}) {
                        padding-right: 0;
                    }
                }

                .subtitle {
                    margin-top: ${spaces.s24};
                    margin-bottom: ${spaces.s42};
                }

                .form {
                    margin-bottom: ${spaces.s42};
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

                .social-text--small {
                    margin: ${spaces.s12} 0 ${spaces.s42} 0;
                }

                .social-buttons {
                    display: flex;
                    flex-direction: column;
                }

                @media ${media.up('small')} {
                    .social-buttons {
                        display: flex;
                        justify-content: space-between;
                    }
                }

                .social-buttons > :global(.${Button.classes.root}):first-of-type {
                    margin-right: ${spaces.s30};
                    margin-bottom: ${spaces.s18};
                }

                @media ${media.up('small')} {
                    .social-buttons {
                        flex-direction: row;
                    }

                    .social-buttons > :global(.${Button.classes.root}):first-of-type {
                        margin-right: ${spaces.s30};
                        margin-bottom: 0;
                    }
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
