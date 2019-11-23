import {useRouter} from 'next/router'
import {useQuery} from 'react-apollo'
import {USER_BY_SLUG} from 'containers/ProfileContainer/queries'
import {UserBySlugQuery, UserBySlugQueryVariables} from 'graphql/generated/queries'

const ProfileContainer = () => {
    const router = useRouter()
    const slug = router.query.slug

    const {data, error, loading} = useQuery<UserBySlugQuery, UserBySlugQueryVariables>(
        USER_BY_SLUG,
        {variables: {slug: slug.toString()}}
    )

    if (error) {
        // TODO: handle error properly
        return null
    }

    if (loading) {
        // TODO: handle loading properly
        return null
    }

    console.log(data)

    return null
}

export default ProfileContainer
