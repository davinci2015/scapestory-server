import React from "react"
import Link from "next/link"
import {withRouter, RouterProps} from "next/router"

import {colors, spaces} from 'styles'

interface Props {
    router: RouterProps
    children: any
    as?: string
    href: string
}

const NavLink = (({router, children, as, href, ...rest}: Props) => (
    <>
        <Link {...rest} href={href} as={as}>
            {React.cloneElement(React.Children.only(children), {
                className: (router.asPath === href || router.asPath === as) ? 'nav-link active' : 'nav-link'
            })}
        </Link>
        <style jsx>{`
            :global(nav a.nav-link) {
                padding: 0 ${spaces.s6}; 
                position: relative;
                text-decoration: none;
                text-transform: uppercase;
                color: ${colors.BLACK};
            }

            :global(nav a.nav-link.active::before) {
                content: "";
                position: absolute;
                bottom: -22px;
                left: 0;
                width: 100%;
                height: 3px;
                background-color: ${colors.PRIMARY};
            }
        `}</style>
    </>
))

export default withRouter(NavLink)
