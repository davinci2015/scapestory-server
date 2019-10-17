import React, {useState} from 'react'
import {useIntl, MessageDescriptor} from 'react-intl'
import {useMutation} from '@apollo/react-hooks'
import Link from 'next/link'

import {Paragraph, Button, Input, PasswordInput, FormattedMessage, Checkbox} from 'components/atoms'

import {RegisterResult, RegisterVariables, SIGN_UP_MUTATION} from 'components/modals/RegistrationModal/RegistrationForm/mutations'
import validator from 'services/validator'
import {spaces} from 'styles'
import routes from 'routes'

const inputKeys = {
    email: 'email',
    password: 'password'
}

const PASSWORD_MIN_LENGTH = 6
interface Props {
    onSuccess: (token: string) => void
}

const RegistrationForm = ({onSuccess}: Props) => {
    const intl = useIntl()
    const [termsAccepted, setTermsAccepted] = useState(false)

    const [errors, setError] = useState({
        [inputKeys.email]: true,
        [inputKeys.password]: true
    })

    const [errorMessages, setErrorMessage] = useState<{[key: string]: MessageDescriptor | null}>({
        [inputKeys.email]: null,
        [inputKeys.password]: null
    })

    const [dirty, setDirty] = useState({
        [inputKeys.email]: false,
        [inputKeys.password]: false
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [register] = useMutation<RegisterResult, RegisterVariables>(SIGN_UP_MUTATION)

    const onSubmit = async () => {
        const {data} = await register({variables: {email, password}})
        if (data) {
            onSuccess(data.register.token)
        }
    }

    const validateEmail = (email: string) => {
        setDirty({...dirty, [inputKeys.email]: true})

        if (validator.isEmpty(email)) {
            setErrorMessage({
                ...errorMessages, [inputKeys.email]: {
                    id: 'general_error_empty_email',
                    defaultMessage: 'Please enter your email'
                }
            })

            return setError({...errors, [inputKeys.email]: true})
        }

        if (!validator.isEmailValid(email)) {
            setErrorMessage({
                ...errorMessages, [inputKeys.email]: {
                    id: 'general_error_invalid_email',
                    defaultMessage: 'Please enter valid email'
                }
            })

            return setError({...errors, [inputKeys.email]: true})
        }

        setError({...errors, [inputKeys.email]: false})
    }

    const validatePassword = (password: string) => {
        setDirty({...dirty, [inputKeys.password]: true})

        if (validator.isEmpty(password)) {
            setErrorMessage({
                ...errorMessages, [inputKeys.password]: {
                    id: 'general_error_empty_password',
                    defaultMessage: 'Please enter your password'
                }
            })
            return setError({...errors, [inputKeys.password]: true})
        }

        if (password.length < PASSWORD_MIN_LENGTH) {
            setErrorMessage({
                ...errorMessages, [inputKeys.password]: {
                    id: 'general_error_password_length',
                    defaultMessage: 'Your password must be at least 6 characters'
                }
            })
            return setError({...errors, [inputKeys.password]: true})
        }

        setError({...errors, [inputKeys.password]: false})
    }

    const getErrorMessage = (inputKey: string) => {
        const message = errorMessages[inputKey]
        return message ? <FormattedMessage {...message} /> : null
    }

    const emailLabel = intl.formatMessage({id: 'registration_input_label_email', defaultMessage: 'Email'})
    const passwordLabel = intl.formatMessage({id: 'registration_input_label_password', defaultMessage: 'Password'})

    return (
        <>
            <form className="form">
                <Input
                    id={inputKeys.email}
                    placeholder={emailLabel}
                    label={emailLabel}
                    value={email}
                    error={dirty[inputKeys.email] && errors[inputKeys.email]}
                    errorMessage={getErrorMessage(inputKeys.email)}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => validateEmail(e.target.value)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />

                <PasswordInput
                    id={inputKeys.password}
                    placeholder={passwordLabel}
                    label={passwordLabel}
                    value={password}
                    error={dirty[inputKeys.password] && errors[inputKeys.password]}
                    errorMessage={getErrorMessage(inputKeys.password)}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => validatePassword(e.target.value)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />

                <Checkbox id="terms" onChange={setTermsAccepted}>
                    <FormattedMessage 
                        id="registration_terms_i_accept" 
                        defaultMessage="I accept" 
                    />
                    {' '}
                    <Link href={routes.termsAndConditions}>
                        <a>
                            <FormattedMessage id="registration_terms_text" defaultMessage="Terms & Conditions" />
                        </a>
                    </Link>
                    {' '}
                    <FormattedMessage 
                        id="registration_terms_and" 
                        defaultMessage="and" 
                    />
                    {' '}
                    <Link href={routes.privacyPolicy}>
                        <a>
                            <FormattedMessage id="registration_privacy_text" defaultMessage="Privacy Policy" />
                        </a>
                    </Link>
                </Checkbox>

                <div className="submit-button">
                    <Button
                        disabled={errors[inputKeys.email] || errors[inputKeys.password] || !termsAccepted}
                        type="block"
                        onClick={onSubmit}>
                        <Paragraph as="span" weight="bold" color="light">
                            <FormattedMessage id="registration_submit_button" defaultMessage="Create Account" />
                        </Paragraph>
                    </Button>
                </div>
            </form>

            <style jsx>{`
                .form :global(.${Input.classes.inputContainer}) {
                    display: block;
                    width: 100%;
                    margin-top: 28px;
                    margin-bottom: 28px;
                }

                .submit-button {
                    margin-top: ${spaces.s48};
                }
            `}</style>
        </>
    )
}

export default RegistrationForm