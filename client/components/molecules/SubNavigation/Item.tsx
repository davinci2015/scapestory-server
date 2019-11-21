import React from 'react'
import {Link} from 'react-scroll'

import {colors, spaces, typography} from 'styles'
import {navigationHeight} from 'components/molecules/Navigation'
import {pxToNumber} from 'utils/converter'

export interface SubNavigationItemProps {
    id: string
}

const SUBNAVIGATION_HEIGHT = '72px'

const offset = -(
    pxToNumber(SUBNAVIGATION_HEIGHT) + pxToNumber(navigationHeight.SLIM)
)

const Item: React.FunctionComponent<SubNavigationItemProps> = ({
    children,
    id,
}) => (
    <>
        <li>
            <Link
                activeClass="active"
                to={id}
                spy
                smooth
                duration={500}
                offset={offset}
            >
                {children}
            </Link>
        </li>

        <style jsx>{`
            li {
                cursor: pointer;
                position: relative;
                margin: 0 ${spaces.s24};
                font-size: ${typography.fontSize.fs16};
                font-weight: ${typography.fontWeight.extraBold};
                color: ${colors.SHADE_DEEP};
                transition: color 100ms linear;
            }

            li :global(.active) {
                color: ${colors.PRIMARY};
            }

            li:hover {
                color: ${colors.PRIMARY};
            }

            li::after {
                content: '';
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: ${colors.DARK_GRAY};
                right: -${spaces.s24};
                top: calc(50% - 2px);
            }
        `}</style>
    </>
)

export {Item}
