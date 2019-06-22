import React, {useState} from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import {Mutation} from 'react-apollo/index'
import Router from 'next/router'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input/Input'
import PasswordInput from 'components/atoms/PasswordInput'
import routes from 'routes'
import auth from 'utils/auth'
import Paragraph from 'components/atoms/Paragraph'
import {FormattedMessage, injectIntl, InjectedIntlProps} from 'react-intl'

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

    const validateEmail = (email?: string) => {
        setDirty({...dirty, [inputKeys.email]: true})
        if (email === '') setError({...errors, [inputKeys.email]: true})
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
                            errorMessage={errors[inputKeys.email]}
                            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => validateEmail(e.target.value)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            id={inputKeys.password}
                            placeholder={passwordLabel}
                            label={passwordLabel}
                            value={password}
                            error={dirty[inputKeys.password] && errors[inputKeys.password]}
                            errorMessage={errors[inputKeys.password]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />

                        <div className="buttons">
                            <Button
                                onClick={() => {
                                    login({
                                        variables: {email, password}
                                    })
                                }}>
                                <FormattedMessage id="login_submit_button" defaultMessage="Login">
                                    {text => <Paragraph as="span" weight="bold" color="light">{text}</Paragraph>}
                                </FormattedMessage>
                            </Button>
                            <Link href={routes.signUp}>
                                <Button variant="outlined">
                                    <FormattedMessage id="login_submit_button" defaultMessage="Sign Up">
                                        {text => <Paragraph as="span" weight="bold" color="primary">{text}</Paragraph>}
                                    </FormattedMessage>
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