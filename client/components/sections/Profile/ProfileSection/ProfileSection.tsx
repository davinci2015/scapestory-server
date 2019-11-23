import {UserBySlugQuery} from 'graphql/generated/queries'

interface Props {
    user: UserBySlugQuery['user']
    toggleFollow: () => void
}

const ProfileSection: React.FunctionComponent<Props> = ({user}) => {
    if (!user) return null

    return (
        <>
            <div className="section"></div>
            <style jsx>{`
                .section {
                }
            `}</style>
        </>
    )
}

export default ProfileSection
