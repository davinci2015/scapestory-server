import {createHttpLink} from 'apollo-link-http'
import {withData} from 'next-apollo'
import {setContext} from 'apollo-link-context'
import appConstants from '../appConstants'
import services from '../services'

const authLink = setContext((_, {headers}) => {
    const token = services.auth.getToken()

    return {
        headers: {
            ...headers,
            [appConstants.HEADER_AUTH_TOKEN]: token || ''
        }
    }
})

const httpLink = createHttpLink({
    uri: 'http://localhost:8080'
})

const config = {
    link: authLink.concat(httpLink)
}

export default withData(config)