import React from 'react'
import Link from 'next/link'

interface Props {
    href: string
    as: string
}

const classes = {
    link: 'details-link',
}

type AquascapeDetailsLinkInterface = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const AquascapeDetailsLink: AquascapeDetailsLinkInterface = ({as, children, href}) => (
    <>
        <Link href={href} as={as}>
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
