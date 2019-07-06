import React, {useState} from 'react'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
import Router from 'next/router'
import Cookies from 'universal-cookie'
import {InjectedIntlProps, injectIntl} from 'react-intl'

import {Button, Input, PasswordInput, FormattedMessage} from 'components/atoms'
import appConstants from 'appConstants'
import routes from 'routes'
import {MessageDescriptor} from 'components/atoms/FormattedMessage'
import validator from 'utils/validator'

const SIGN_UP = gql`
    mutation SignUp($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            token
        }
    }
`

interface Data {
    register: {
        token: string
    }
}

interface Variables {
    email: string
    password: string
}

const inputKeys = {
    email: 'email',
    password: 'password'
}

interface Props extends InjectedIntlProps {}

const RegistrationForm = ({
    intl
}: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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

    const onCompleted = (data: Data) => {
        const cookies = new Cookies()
        cookies.set(appConstants.COOKIE_AUTH, data.register.token)
        Router.push(routes.index)
    }

    const emailLabel = intl.formatMessage({id: 'registration_input_label_email', defaultMessage: 'Email'})
    const passwordLabel = intl.formatMessage({id: 'registration_input_label_password', defaultMessage: 'Password'})

    return (
        <Mutation<Data, Variables>
            onCompleted={onCompleted}
            mutation={SIGN_UP}>
            {(register) => (
                <form>
                    <Input
                        placeholder={emailLabel}
                        label={emailLabel}
                        value={email}
                        error={dirty[inputKeys.email] && errors[inputKeys.email]}
                        errorMessage={getErrorMessage(inputKeys.email)}
                        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => validateEmail(e.target.value)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        placeholder={passwordLabel}
                        label={passwordLabel}
                        value={password}
                        error={dirty[inputKeys.password] && errors[inputKeys.password]}
                        errorMessage={getErrorMessage(inputKeys.password)}
                        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => validatePassword(e.target.value)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />

                    <Button
                        onClick={() => {
                            register({
                                variables: {email, password}
                            })
                        }}>
                        <FormattedMessage id="registration_submit_button" defaultMessage="Sign up"/>
                    </Button>
                </form>
            )}
        </Mutation>
    )
}

export default injectIntl(RegistrationForm)