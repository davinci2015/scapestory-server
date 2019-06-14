import {LoginForm} from 'screens/Login/components'
import {Layout} from 'components/molecules'
import {backgroundImage} from 'styles/mixins'
import {colors} from 'styles';
import {Headline, Paragraph} from 'components/atoms'

const Login = () => {
    return (
        <Layout>
            <div className="container">
                <div className="left">
                    <div className="left-container">
                        <Headline as="h1" variant="h3">
                            Don't be shy! Show of your aquascapes.
                        </Headline>
                        <Paragraph as="p" color="secondary">
                            Join now to start your own scapestory.
                        </Paragraph>
                        <div className="form">
                            <LoginForm />
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
                    margin-bottom: 44px;
                }

                .left-container {
                    margin-right: 140px;
                    max-width: 430px;
                }

                .left {
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    justify-content: center;
                }

                .right {
                    width: 50%;
                    border-left: 6px solid ${colors.PRIMARY};
                    ${backgroundImage('https://images.unsplash.com/photo-1516970739312-08b075784b71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80')}
                }
            `}</style>
        </Layout>
    )
}

export default Login