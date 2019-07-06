import {LoginForm} from 'screens/Login/components'
import {Layout, FacebookLogin, GoogleLogin} from 'components/molecules'
import {colors} from 'styles'
import {Headline, Paragraph, FormattedMessage, Bubble} from 'components/atoms'
import {FacebookProps} from 'components/molecules/FacebookLogin'
import {GoogleProps} from 'components/molecules/GoogleLogin'

const Login = () => {
    return (
        <Layout>
            <div className="container">
                <div className="bubble-top"><Bubble size="411px" /></div>
                <div className="bubble-bottom"><Bubble size="684px" /></div>
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
                        <div>
                            <Paragraph as="span" color={colors.DARK_GRAY}>
                                <FormattedMessage id="login_social_login_continue" defaultMessage="Or continue with" />
                            </Paragraph>
                        </div>
                        <div>
                            <GoogleLogin>
                                {(props: GoogleProps) => (
                                    <a href="#" onClick={props.onClick}>
                                        <Paragraph weight="bold" as="span" color={colors.GOOGLE}>Google</Paragraph>
                                    </a>
                                )}
                            </GoogleLogin>

                            <span className="separator">
                                <Paragraph as="span" color={colors.MID_GRAY}>|</Paragraph>
                            </span>
                            <FacebookLogin>
                                {(props: FacebookProps) => (
                                    <a href="#" onClick={props.onClick}>
                                        <Paragraph weight="bold" as="span" color={colors.FACEBOOK}>Facebook</Paragraph>
                                    </a>
                                )}
                            </FacebookLogin>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container {
                }

                .form {
                    margin-top: 90px;
                    margin-bottom: 24px;
                }

                .bubble-top > :global(.bubble) {
                    position: absolute;
                    top: -260px;
                    right: -200px;
                }

                .bubble-bottom > :global(.bubble) {
                    position: absolute;
                    left: -520px;
                    bottom: 10px;
                }

                .separator {
                    margin: 0 24px;
                }

                .social {
                    text-align: center;
                }
            `}</style>
        </Layout>
    )
}

export default Login