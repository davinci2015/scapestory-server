import React from "react"
import Link from "next/link"
import {withRouter} from "next/router"

import {colors, spaces, typography} from 'styles'
import {Router} from 'next/router'

export interface Props {
    router: Router
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
                transition: color 100ms ease-in-out;
            }

            :global(nav a.nav-link:hover) {
                color: ${colors.BLACK};
            }

            :global(nav a.nav-link.active) {
                color: ${colors.BLACK};
                border-bottom: 3px solid ${colors.PRIMARY};
            }
        `}</style>
    </>
))

export default withRouter(NavLink)
