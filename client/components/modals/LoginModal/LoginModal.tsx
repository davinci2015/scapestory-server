import React, {useContext} from 'react'

import {LoginForm, AuthModal} from 'components/modals'
import {Paragraph, FormattedMessage} from 'components/atoms'

import {colors} from 'styles'
import {ModalContext} from 'providers/ModalProvider'
import cookie from 'services/cookie'
import {AuthContext} from 'providers/AuthenticationProvider'

const LoginModal = () => {
    const {setAuthenticated} = useContext(AuthContext)
    const {closeModal, openModal} = useContext(ModalContext)

    const openRegistrationModal = () => openModal('register')

    const handleSuccess = (token: string) => {
        cookie.persistAuthToken(token)
        setAuthenticated(true)
        closeModal()
    }

    return (
        <AuthModal
            onSuccess={handleSuccess}
            form={<LoginForm onSuccess={handleSuccess} />}
            title={
                <FormattedMessage
                    id="login_title"
                    defaultMessage="Welcome back! Your scapestory is waiting."
                />
            }
            subtitle={
                <FormattedMessage
                    id="login_subtitle"
                    defaultMessage="Login and continue exploring aquascapes."
                />
            }
            footer={
                <Paragraph as="span" color={colors.SHADE_DEEP}>
                    <FormattedMessage
                        id="login_footer_not_member"
                        defaultMessage="Not a member yet?"
                    />{' '}
                    <a onClick={openRegistrationModal}>
                        <Paragraph as="span" color={colors.PRIMARY} weight="bold">
                            <FormattedMessage id="login_footer_sign_up" defaultMessage="Sign up" />
                        </Paragraph>
                    </a>
                </Paragraph>
            }
        />
    )
}

export default LoginModal
