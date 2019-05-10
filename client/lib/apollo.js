import {HttpLink} from 'apollo-link-http'
import {withData} from 'next-apollo'

const config = {
    link: new HttpLink({
        uri: 'http://localhost:8080'
    })
}

export default withData(config)