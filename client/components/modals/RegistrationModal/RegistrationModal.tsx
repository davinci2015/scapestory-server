import React, {useContext} from 'react'

import {Paragraph, FormattedMessage} from 'components/atoms'
import {RegistrationForm, AuthModal} from 'components/modals'

import {colors} from 'styles'
import {ModalContext} from 'providers/ModalProvider'
import cookie from 'services/cookie'
import {AuthContext} from 'providers/AuthenticationProvider'

const RegistrationModal = () => {
    const {refreshAuthentication} = useContext(AuthContext)
    const {closeModal, openModal} = useContext(ModalContext)

    const openLoginModal = () => openModal('login')

    const handleSuccess = (token: string) => {
        cookie.persistAuthToken(token)
        refreshAuthentication()
        closeModal()
    }

    return (
        <AuthModal
            onSuccess={handleSuccess}
            form={<RegistrationForm />}
            title={
                <FormattedMessage
                    id="registration_title"
                    defaultMessage="Don’t be shy! Sign up to share your scapestory."
                />
            }
            subtitle={
                <FormattedMessage
                    id="registration_subtitle"
                    defaultMessage="Create account to get the full Scapestory experience."
                />
            }
            socialText={
                <Paragraph as="span" type="s1" color={colors.DARK_GRAY}>
                    <FormattedMessage
                        id="registration_social_login_agreement"
                        defaultMessage="By continuing with Google or Facebook you automatically accept Terms & Conditions and Privacy Policy"
                    />
                </Paragraph>
            }
            footer={
                <Paragraph as="span" color={colors.SHADE_DEEP}>
                    <FormattedMessage
                        id="registration_footer_not_member"
                        defaultMessage="Already have an account?"
                    />{' '}
                    <a onClick={openLoginModal}>
                        <Paragraph as="span" color={colors.PRIMARY} weight="bold">
                            <FormattedMessage
                                id="registration_footer_sign_up"
                                defaultMessage="Login"
                            />
                        </Paragraph>
                    </a>
                </Paragraph>
            }
        />
    )
}

export default RegistrationModal
