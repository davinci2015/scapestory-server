import {Query} from 'react-apollo'
import gql from 'graphql-tag'

const USERS = gql`
    query {
        users {
            id
            email
        }
    }
`

const AQUASCAPES = gql`
    query {
        aquascapes {
            id
            title
            volume
            startedAt
        }
    }
`

const Users = () => {
    return (
        <div>
            <h1>Users</h1>
            <Query query={USERS}>
                {({loading, error, data}) => {
                    console.log(data)
                    return null
                }}
            </Query>
            <h1>Users from client</h1>
            <Query query={AQUASCAPES}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...'
                    if (error) return `Error! ${error.message}`

                    console.log(data)
                    return data.aquascapes.map(user => (
                        <p key={user.id}>{user.email}</p>
                    ))
                }}
            </Query>
        </div>
    )
}

export default Users