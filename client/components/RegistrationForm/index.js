import React, {useState} from 'react'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
import Router from 'next/router'
import Button, {buttonOptions} from '../Button'
import Input from '../Form/Input'
import routes from '../../routes'

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
        console.log(data.register.token)
        Router.push(routes.index)
    }

    return (
        <Mutation
            onCompleted={onCompleted}
            mutation={SIGN_UP}>
            {(register, {data, error}) => (
                <form>
                    <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <Button
                        onClick={() => {
                            register({
                                variables: {email, username, password}
                            })
                        }}
                        color={buttonOptions.color.PRIMARY}>
                        Sign Up
                    </Button>
                </form>
            )}
        </Mutation>
    )
}

export default RegistrationForm