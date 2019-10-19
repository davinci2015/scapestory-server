import React from 'react'

import {colors, boxShadow} from 'styles'
import {GRID_MAX_WIDTH} from 'components/core/Grid'
import {SubNavigationItemProps, Item} from 'components/molecules/SubNavigation/Item'

type SubNavigationInterface<P = {}> = React.FunctionComponent<P> & {
    Item: React.FunctionComponent<SubNavigationItemProps>
}

const SubNavigation: SubNavigationInterface = ({children}) => {
    return (
        <>
            <div className="subnav">
                <ul>{children}</ul>
            </div>

            <style jsx>{`
                .subnav {
                    height: 72px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    background-color: ${colors.WHITE};
                    box-shadow: ${boxShadow.PRIMARY};
                }
                
                .subnav > ul {
                    width: 100%;
                    max-width: ${GRID_MAX_WIDTH};
                    margin: 0 auto;
                    list-style: none;
                    display: flex;
                    padding: 0;
                }

                .subnav > ul :global(li:last-of-type::after) {
                    display: none;
                }
            `}</style>
        </>
    )
}

SubNavigation.Item = Item

export default SubNavigation