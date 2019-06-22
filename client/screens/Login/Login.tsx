import {LoginForm} from 'screens/Login/components'
import {Layout} from 'components/molecules'
import {backgroundImage} from 'styles/mixins'
import {colors, zIndex} from 'styles'
import {Headline, Paragraph, FormattedMessage, Bubble} from 'components/atoms'

const Login = () => {
    return (
        <Layout>
            <div className="container">
                <div className="left">
                    <div className="bubble-top"><Bubble size="411px" /></div>
                    <div className="bubble-bottom"><Bubble size="684px" /></div>
                    <div className="left-container">
                        <Headline as="h1" variant="h3">
                            <FormattedMessage id="login_title" defaultMessage="Don't be shy! Show of your aquascapes." />
                        </Headline>
                        <Paragraph as="p" color={colors.DARK_GRAY}>
                            <FormattedMessage id="login_subtitle" defaultMessage="Join now to start your own scapestory." />
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
                                <Paragraph weight="bold" as="span" color={colors.GOOGLE}>Google</Paragraph>
                                <span className="separator">
                                    <Paragraph as="span" color={colors.DARK_GRAY}>|</Paragraph>
                                </span>
                                <Paragraph weight="bold" as="span" color={colors.FACEBOOK}>Facebook</Paragraph>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right"></div>
            </div>

            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: space-between;
                    min-height: 100vh;
                }

                .form {
                    margin-top: 44px;
                    margin-bottom: 114px;
                }

                .left-container {
                    margin: 40px 140px 40px 0;
                    max-width: 430px;
                }

                .left {
                    position: relative;
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    justify-content: center;
                }

                .right {
                    width: 50%;
                    z-index: ${zIndex.MEDIUM};
                    border-left: 6px solid ${colors.PRIMARY};
                    ${backgroundImage('https://images.unsplash.com/photo-1516970739312-08b075784b71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80')}
                }

                .left .social {
                    display: flex;
                    justify-content: space-between;
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
                    margin: 0 8px;
                }
            `}</style>
        </Layout>
    )
}

export default Login