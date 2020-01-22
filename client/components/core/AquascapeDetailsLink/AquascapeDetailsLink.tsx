import React from 'react'
import Link from 'next/link'

import routes, {createDynamicPath, getAquascapeDetailsSlug} from 'routes'
import config from 'config'

interface Props {
    id: number
    title?: string | null
}

const classes = {
    link: 'details-link',
}

type AquascapeDetailsLinkInterface = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const AquascapeDetailsLink: AquascapeDetailsLinkInterface = ({children, id, title}) => (
    <>
        <Link
            href={routes.aquascapeDetails}
            as={createDynamicPath(routes.aquascapeDetails, {
                id: id.toString(),
                title: getAquascapeDetailsSlug(title || config.AQUASCAPE_TITLE_PLACEHOLDER),
            })}
        >
            <a className={classes.link}>{children}</a>
        </Link>
        <style jsx>{`
            a {
                text-decoration: none;
            }
        `}</style>
    </>
)

AquascapeDetailsLink.classes = classes

export default AquascapeDetailsLink
