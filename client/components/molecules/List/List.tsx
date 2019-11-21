import React from 'react'
import {Headline} from 'components/atoms'
import {colors, typography, spaces} from 'styles'

import Item from './Item'

interface Props {
    icon: React.ReactNode
    title: React.ReactNode
    children: React.ReactNode
}

const classes = {
    root: 'list',
}

const List = ({icon, title, children}: Props) => (
    <div className={classes.root}>
        <div className="icon">{icon}</div>
        <div className="content">
            <Headline
                variant="h4"
                as="h4"
                fontWeight={typography.fontWeight.extraBold}
            >
                {title}
            </Headline>
            {children}
        </div>

        <style jsx>{`
            .list {
                position: relative;
            }

            .list :global(.${Headline.classes.root}) {
                padding-top: ${spaces.s6};
                margin-bottom: ${spaces.s24};
            }

            .icon {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                left: 0;
                top: 0;
                width: 48px;
                height: 48px;

                background-color: ${colors.PRIMARY};
                border-radius: 50%;
            }

            .content {
                padding-left: 84px;
            }
        `}</style>
    </div>
)

List.classes = classes
List.Item = Item

export default List
