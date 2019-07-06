import {LoginForm} from 'screens/Login/components'
import {Layout, FacebookLogin, GoogleLogin} from 'components/molecules'
import {colors, spaces} from 'styles'
import {Headline, Paragraph, FormattedMessage, Bubble, Button, ButtonIcon} from 'components/atoms'
import {FacebookProps} from 'components/molecules/FacebookLogin'
import {GoogleProps} from 'components/molecules/GoogleLogin'

const Login = () => {
    return (
        <Layout>
            <div className="container">
                <div className="bubble-left"><Bubble size="200px" /></div>
                <div className="bubble-right"><Bubble size="200px" /></div>
                <div className="">
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
                                    <Button color="secondary" onClick={props.onClick}>
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
                                    <Button color="secondary" onClick={props.onClick}>
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
                    <div className="footer">
                        <Paragraph as="span" color={colors.SHADE_DEEP}>
                            <FormattedMessage id="login_footer_not_member" defaultMessage="Not a member yet?"/>
                            <FormattedMessage id="login_footer_sign_up" defaultMessage="Sign up"/>
                        </Paragraph>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container {
                }

                .form {
                    margin-top: ${spaces.s42};
                    margin-bottom: ${spaces.s24};
                }

                .bubble-left > :global(.bubble) {
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                .bubble-right > :global(.bubble) {
                    position: absolute;
                    right: 0;
                    top: 0;
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
            `}</style>
        </Layout>
    )
}

export default Login