import React from 'react'

import {colors, boxShadow, zIndex} from 'styles'
import {
    SubNavigationItemProps,
    Item,
} from 'components/molecules/SubNavigation/Item'
import {navigationHeight} from 'components/molecules/Navigation'
import {Grid} from 'components/core'

type SubNavigationInterface<P = {}> = React.FunctionComponent<P> & {
    Item: React.FunctionComponent<SubNavigationItemProps>
}

const SubNavigation: SubNavigationInterface = ({children}) => (
    <>
        <div className="subnav">
            <div className="wrapper">
                <Grid>
                    <ul>{children}</ul>
                </Grid>
            </div>
        </div>

        <style jsx>{`
            .subnav {
                position: sticky;
                top: ${navigationHeight.SLIM};
                height: 72px;
                width: 100%;
                display: flex;
                align-items: center;

                background-color: ${colors.WHITE};
                box-shadow: ${boxShadow.PRIMARY};
                z-index: ${zIndex.HIGH};
            }

            .subnav .wrapper {
                width: 100%;
            }

            .subnav ul {
                width: 100%;
                list-style: none;
                display: flex;
                padding: 0;
            }

            .subnav ul :global(li:last-of-type::after) {
                display: none;
            }

            .subnav ul :global(li:first-of-type) {
                margin-left: 0;
                padding-left: 0;
            }
        `}</style>
    </>
)

SubNavigation.Item = Item

export default SubNavigation
