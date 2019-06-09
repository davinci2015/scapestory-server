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
                    <div className="form">
                        <Headline as="h1" variant="h4">
                            Don't be shy! Show of your aquascapes.
                        </Headline>
                        <Paragraph as="p" size="s">
                            Join now and become a part of the aquascape community
                        </Paragraph>
                        <LoginForm />
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
                    max-width: 300px;
                }

                .left {
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .right {
                    width: 50%;
                    border-left: 6px solid ${colors.PRIMARY};
                    ${backgroundImage('https://cdn.pixabay.com/photo/2016/12/31/21/22/discus-fish-1943755_1280.jpg')}
                }
            `}</style>
        </Layout>
    )
}

export default Login