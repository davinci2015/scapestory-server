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
import Paragraph from 'components/atoms/Paragraph';

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

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onCompleted = (data: Data) => {
        auth.persistToken(data.login.token)
        Router.push(routes.index)
    }

    return (
        <>
            <Mutation<Data, Variables>
                onCompleted={onCompleted}
                mutation={LOGIN}>
                {(login) => (
                    <form className="form">
                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <div className="buttons">
                            <Button
                                onClick={() => {
                                    login({
                                        variables: {email, password}
                                    })
                                }}>
                                <Paragraph as="span">Login</Paragraph>
                            </Button>
                            <Link href={routes.signUp}>
                                <Button variant="outlined">
                                    <Paragraph as="span">Sign Up</Paragraph>
                                </Button>
                            </Link>
                        </div>
                    </form>
                )}
            </Mutation>
            <style jsx>{`
                .form :global(input) {
                    display: block;
                    width: 100%;
                    margin-top: 28px;
                    margin-bottom: 28px;
                } 

                .form :global(button) {
                    width: 100%;
                    margin-left: 12px;
                }

                .buttons {
                    display: flex;
                    margin-left: -12px;
                    margin-top: 38px;
                    margin-bottom: 48px;
                }
            `}</style>
        </>
    )
}

export default LoginForm