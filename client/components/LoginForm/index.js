import React, {useState} from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import {Mutation} from 'react-apollo'
import Router from 'next/router'
import Cookies from 'universal-cookie'
import Button from '../Button'
import Input from '../Form/Input'
import routes from '../../routes'
import PasswordInput from '../Form/PasswordInput'
import appConstants from '../../appConstants'

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onCompleted = (data) => {
        const cookies = new Cookies()
        cookies.set(appConstants.COOKIE_AUTH, data.login.token)
        Router.push(routes.index)
    }

    return (
        <React.Fragment>
            <Mutation
                onCompleted={onCompleted}
                mutation={LOGIN}>
                {(register, {data, error}) => (
                    <form>
                        <Input
                            variant="outlined"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            variant="outlined"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                register({
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
        </React.Fragment>
    )
}

export default LoginForm