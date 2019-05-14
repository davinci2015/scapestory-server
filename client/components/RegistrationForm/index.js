import React, {useState} from 'react'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
import Router from 'next/router'
import Button from '../Button'
import Input from '../Form/Input'
import routes from '../../routes'
import PasswordInput from '../Form/PasswordInput'
import services from '../../services'

const SIGN_UP = gql`
    mutation SignUp($email: String!, $username: String!, $password: String!) {
        register(email: $email, username: $username, password: $password) {
            token
        }
    }
`

const RegistrationForm = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onCompleted = (data) => {
        services.auth.setToken(data.register.token)
        Router.push(routes.index)
    }

    return (
        <Mutation
            onCompleted={onCompleted}
            mutation={SIGN_UP}>
            {(register, {data, error}) => (
                <form>
                    <Input
                        variant="outlined"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        variant="outlined"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <PasswordInput
                        variant="outlined"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            register({
                                variables: {email, username, password}
                            })
                        }}>
                        Sign Up
                    </Button>
                </form>
            )}
        </Mutation>
    )
}

export default RegistrationForm