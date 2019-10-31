import {useContext} from 'react'

import {LoginForm, AuthModal} from 'components/modals'
import {Paragraph, FormattedMessage} from 'components/atoms'

import {colors} from 'styles'
import {ModalContext} from 'context/modal'
import auth from 'services/auth'
import {AuthContext} from 'context/auth'

const LoginModal = () => {
    const {setIsAuthenticated} = useContext(AuthContext)
    const {openModal, closeModal} = useContext(ModalContext)

    const openRegistrationModal = () => openModal('register')

    const handleSuccess = (token: string) => {
        auth.persistToken(token)
        setIsAuthenticated(true)
        closeModal()
    } 

    return (
        <AuthModal
            onSuccess={handleSuccess}
            form={<LoginForm onSuccess={handleSuccess}/>}
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