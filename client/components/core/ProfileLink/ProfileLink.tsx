import React from 'react'
import Link from 'next/link'

import routes, {createDynamicPath} from 'routes'

interface Props {
    slug: string
}

const ProfileLink: React.FunctionComponent<Props> = ({children, slug}) => (
    <>
        <Link href={routes.profile} as={createDynamicPath(routes.profile, {slug})}>
            <a>{children}</a>
        </Link>
        <style jsx>{`
            a {
                text-decoration: none;
            }
        `}</style>
    </>
)

export default ProfileLink
