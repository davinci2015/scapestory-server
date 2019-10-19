import React from 'react'

import {colors, spaces, typography, applyStyles} from 'styles'

export interface SubNavigationItemProps {
    active: boolean
}

const Item: React.FunctionComponent<SubNavigationItemProps> = ({children, active}) => (
    <>
        <li>{children}</li>

        <style jsx>{`
            li {
                cursor: pointer;
                position: relative;
                margin: 0 ${spaces.s24};
                font-size: ${typography.fontSize.fs16};
                font-weight: ${typography.fontWeight.extraBold};
                color: ${colors.SHADE_DEEP};
                transition: color 100ms linear;

                ${applyStyles(active)(`
                    color: ${colors.PRIMARY};
                `)}
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