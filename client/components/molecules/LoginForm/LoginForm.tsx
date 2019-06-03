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
                    <form>
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

                        <Button
                            onClick={() => {
                                login({
                                    variables: {email, password}
                                })
                            }}>
                            Sign Up
                        </Button>
                    </form>
                )}
            </Mutation>
            <Link href={routes.signUp}>
                <a>Not a member? Sign up here</a>
            </Link>
        </>
    )
}

export default LoginForm