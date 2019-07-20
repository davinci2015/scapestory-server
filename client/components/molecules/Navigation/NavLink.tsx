import React from "react"
import Link from "next/link"
import {withRouter, RouterProps} from "next/router"

import {colors, spaces, typography} from 'styles'

export interface Props {
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
                display: flex;
                align-items: center;
                
                height: 100%;
                padding: ${spaces.s12} ${spaces.s6}; 
                margin: 0 ${spaces.s36};

                text-decoration: none;
                font-weight: ${typography.fontWeight.bold};
                color: ${colors.SHADE_DEEP};
            }

            :global(nav a.nav-link.active) {
                color: ${colors.BLACK};
                border-bottom: 3px solid ${colors.PRIMARY};
            }
        `}</style>
    </>
))

export default withRouter(NavLink)
