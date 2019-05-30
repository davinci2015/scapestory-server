import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import FacebookLogin from './FacebookLogin'

const LOGIN = gql`
    mutation Login($token: String!) {
        fbRegister(token: $token) {
            token
        }
    }
`

export default graphql(LOGIN, { name: 'login' })(FacebookLogin)