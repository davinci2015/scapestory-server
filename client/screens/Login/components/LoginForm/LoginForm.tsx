import React, {useState} from 'react'
import Router from 'next/router'
import gql from 'graphql-tag'
import Link from 'next/link'
import {Mutation} from 'react-apollo'
import {injectIntl, InjectedIntlProps} from 'react-intl'

import routes from 'routes'
import auth from 'utils/auth'
import {Paragraph, Button, Input, PasswordInput, FormattedMessage} from 'components/atoms'
import validator from 'utils/validator'
import {MessageDescriptor} from 'components/atoms/FormattedMessage'

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

interface Data {
    login: {
        token: string
    }
}

interface Variables {
    email: string,
    password: string
}

const inputKeys = {
    email: 'email',
    password: 'password'
}

interface Props extends InjectedIntlProps {}

const LoginForm = ({
    intl
}: Props) => {
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

    const onCompleted = (data: Data) => {
        auth.persistToken(data.login.token)
        Router.push(routes.index)
    }

    const validateEmail = (email: string) => {
        setDirty({...dirty, [inputKeys.email]: true})

        if (validator.isEmpty(email)) {
            setErrorMessage({
                ...errorMessages, [inputKeys.email]: {
                    id: 'login_input_error_empty_email',
                    defaultMessage: 'Please enter your email'
                }
            })

            return setError({...errors, [inputKeys.email]: true})
        }

        if (!validator.isEmailValid(email)) {
            setErrorMessage({
                ...errorMessages, [inputKeys.email]: {
                    id: 'login_input_error_invalid_email',
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
                    id: 'login_input_error_empty_password',
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
            <Mutation<Data, Variables>
                onCompleted={onCompleted}
                mutation={LOGIN}>
                {(login) => (
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

                        <div className="buttons">
                            <Button
                                onClick={() => {
                                    login({
                                        variables: {email, password}
                                    })
                                }}>
                                <Paragraph as="span" weight="bold" color="light">
                                    <FormattedMessage id="login_submit_button" defaultMessage="Login" />
                                </Paragraph>
                            </Button>
                            <Link href={routes.signUp}>
                                <Button variant="outlined">
                                    <Paragraph as="span" weight="bold" color="primary">
                                        <FormattedMessage id="login_submit_button" defaultMessage="Sign Up" />
                                    </Paragraph>
                                </Button>
                            </Link>
                        </div>
                    </form>
                )}
            </Mutation>

            <style jsx>{`
                .form :global(.input-container) {
                    display: block;
                    width: 100%;
                    margin-top: 28px;
                    margin-bottom: 28px;
                } 

                .buttons :global(button) {
                    width: 100%;
                    margin-left: 24px;
                }

                .buttons {
                    display: flex;
                    margin-left: -24px;
                    margin-top: 44px;
                    margin-bottom: 48px;
                }
            `}</style>
        </>
    )
}

export default injectIntl(LoginForm)