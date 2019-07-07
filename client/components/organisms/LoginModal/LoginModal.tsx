import {useContext} from 'react'

import {LoginForm, AuthModal} from 'components/organisms'
import {Paragraph, FormattedMessage} from 'components/atoms'
import {colors} from 'styles'
import {ModalContext} from 'context/modal'

const LoginModal = () => {
    const {openModal} = useContext(ModalContext)

    const openRegistrationModal = () => openModal('register')

    return (
        <AuthModal
            authType="login"
            form={<LoginForm />}
            title={<FormattedMessage id="login_title" defaultMessage="Welcome back! Your scapestory is waiting." />}
            subtitle={<FormattedMessage id="login_subtitle" defaultMessage="Login and continue exploring aquascapes." />}
            footer={(
                <Paragraph as="span" color={colors.SHADE_DEEP}>
                    <FormattedMessage id="login_footer_not_member" defaultMessage="Not a member yet?" />
                    {' '}
                    <a onClick={openRegistrationModal}>
                        <Paragraph as="span" color={colors.PRIMARY} weight="bold">
                            <FormattedMessage id="login_footer_sign_up" defaultMessage="Sign up" />
                        </Paragraph>
                    </a>
                </Paragraph>
            )}
        />
    )
}

export default LoginModal