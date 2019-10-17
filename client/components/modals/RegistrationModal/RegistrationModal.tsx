import {useContext} from 'react'
import Router from 'next/router'

import {Paragraph, FormattedMessage} from 'components/atoms'
import {RegistrationForm, AuthModal} from 'components/organisms'

import {colors} from 'styles'
import {ModalContext} from 'context/modal'
import auth from 'services/auth'
import routes from 'routes'

const RegistrationModal = () => {
    const {openModal, closeModal} = useContext(ModalContext)

    const openLoginModal = () => openModal('login')

    const handleSuccess = (token: string) => {
        auth.persistToken(token)
        closeModal()
        Router.push(routes.index)
    } 

    return (
        <AuthModal
            onSuccess={handleSuccess}
            form={<RegistrationForm onSuccess={handleSuccess}/>}
            title={<FormattedMessage id="registration_title" defaultMessage="Don’t be shy! Sign up to share your scapestory." />}
            subtitle={<FormattedMessage id="registration_subtitle" defaultMessage="Create account to get the full Scapestory experience." />}
            footer={(
                <Paragraph as="span" color={colors.SHADE_DEEP}>
                    <FormattedMessage id="registration_footer_not_member" defaultMessage="Already have an account?" />
                    {' '}
                    <a onClick={openLoginModal}>
                        <Paragraph as="span" color={colors.PRIMARY} weight="bold">
                            <FormattedMessage id="registration_footer_sign_up" defaultMessage="Login" />
                        </Paragraph>
                    </a>
                </Paragraph>
            )}
        />
    )
}

export default RegistrationModal