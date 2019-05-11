import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const Users = (
    {
        data: {users, loading, error}
    }
) => {
    return <h1>Users</h1>
}

const users = gql`
    query {
        users {
            id
            email
        }
    }
`

export default graphql(users, {
    props: ({data}) => ({data})
})(Users)