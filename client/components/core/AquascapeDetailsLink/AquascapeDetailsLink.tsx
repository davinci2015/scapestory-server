import React from 'react'
import Link from 'next/link'

import routes, {createDynamicPath, getAquascapeDetailsSlug} from 'routes'

interface Props {
    id: number
    title: string
}

const AquascapeDetailsLink: React.FunctionComponent<Props> = ({children, id, title}) => (
    <>
        <Link
            href={routes.aquascapeDetails}
            as={createDynamicPath(routes.aquascapeDetails, {
                id: id.toString(),
                title: getAquascapeDetailsSlug(title),
            })}
        >
            <a>{children}</a>
        </Link>
        <style jsx>{`
            a {
                text-decoration: none;
            }
        `}</style>
    </>
)

export default AquascapeDetailsLink
