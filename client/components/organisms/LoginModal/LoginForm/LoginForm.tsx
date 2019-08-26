import React, {useState} from 'react'
import {useMutation} from 'react-apollo-hooks'
import {injectIntl, InjectedIntlProps} from 'react-intl'

import {Paragraph, Button, Input, PasswordInput, FormattedMessage} from 'components/atoms'
import {MessageDescriptor} from 'components/atoms/FormattedMessage'

import validator from 'services/validator'
import {spaces} from 'styles'
import {LOGIN_MUTATION, LoginResult, LoginVariables} from 'components/organisms/LoginModal/LoginForm/mutations'

const inputKeys = {
    email: 'email',
    password: 'password'
}

interface Props extends InjectedIntlProps {
    onSuccess: (token: string) => void
}

const LoginForm = ({
    intl,
    onSuccess
}: Props) => {
    const login = useMutation<LoginResult, LoginVariables>(LOGIN_MUTATION)

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

    const onSubmit = async () => {
        const {data} = await login({variables: {email, password}})
        onSuccess(data.login.token)
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

        setError({...errors, [inputKeys.password]: false})
    }

    const getErrorMessage = (inputKey: string) => {
        const message = errorMessages[inputKey]
        return message ? <FormattedMessage {...message} /> : null
    }

    const emailLabel = intl.formatMessage({id: 'login_input_label_email', defaultMessage: 'Email'})
    const passwordLabel = intl.formatMessage({id: 'login_input_label_password', defaultMessage: 'Password'})

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

                <div className="login-button">
                    <Button onClick={onSubmit} type="block">
                        <Paragraph as="span" weight="bold" color="light">
                            <FormattedMessage id="login_submit_button" defaultMessage="Login" />
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

                .login-button {
                    margin-top: ${spaces.s48};
                }
            `}</style>
        </>
    )
}

export default injectIntl(LoginForm)