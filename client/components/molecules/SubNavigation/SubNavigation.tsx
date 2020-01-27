import React from 'react'

import {colors, boxShadow, zIndex, media, spaces} from 'styles'
import {SubNavigationItemProps, Item} from 'components/molecules/SubNavigation/Item'
import {navigationHeight} from 'components/molecules/Navigation'
import {GRID_WIDTH_DEFAULT} from 'components/core/Hide/Hide'

type SubNavigationInterface<P = {}> = React.FunctionComponent<P> & {
    Item: React.FunctionComponent<SubNavigationItemProps>
}

const SubNavigation: SubNavigationInterface = ({children}) => (
    <>
        <div className="subnav">
            <div className="wrapper">
                <ul>{children}</ul>
            </div>
        </div>

        <style jsx>{`
            :global(.footer) {
                padding-bottom: 62px;
            }

            .subnav {
                position: fixed;
                bottom: 0;
                height: 62px;
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
                justify-content: space-between;
                align-items: center;
                padding: 0;
            }

            .subnav ul :global(li:last-of-type::after) {
                display: none;
            }

            @media ${media.up('small')} {
                :global(.footer) {
                    padding-bottom: 0;
                }

                .subnav {
                    position: sticky;
                    top: ${navigationHeight.SLIM};
                    height: 72px;
                }

                .subnav ul {
                    padding-left: ${spaces.s16};
                    justify-content: flex-start;
                }

                .subnav ul :global(li:first-of-type) {
                    margin-left: 0;
                    padding-left: 0;
                }
            }

            @media ${media.up('medium')} {
                .subnav .wrapper {
                    max-width: ${GRID_WIDTH_DEFAULT};
                    margin: 0 auto;
                }

                .subnav ul {
                    padding-left: ${spaces.s24};
                }
            }
        `}</style>
    </>
)

SubNavigation.Item = Item

export default SubNavigation
