import React from 'react'
import classnames from 'classnames'

import {IconButton, Icon} from 'components/atoms'
import {spaces, colors, borderRadius} from 'styles'

const classes = {
    root: 'card-list-item',
}

interface Props {
    onDelete?: ((...args: any[]) => void) | undefined
}

type CardInterface = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const CardListItem: CardInterface = ({children, onDelete}) => (
    <>
        <div
            className={classnames({
                [classes.root]: Boolean(onDelete),
            })}
        >
            {children}
            {onDelete && (
                <IconButton onClick={onDelete}>
                    <Icon d={Icon.BIN} color={colors.PRIMARY} />
                </IconButton>
            )}
        </div>

        <style jsx>{`
            .card-list-item {
                display: flex;
                align-items: center;
                padding: ${spaces.s4} ${spaces.s12};
                margin-left: -${spaces.s12};

                border-radius: ${borderRadius.TERTIARY};
                transition: background-color 100ms ease-in-out;
            }

            .card-list-item:hover {
                background-color: ${colors.PRIMARY_LIGHT};
            }

            .card-list-item :global(.${IconButton.classes.root}) {
                margin-left: ${spaces.s8};
            }
        `}</style>
    </>
)

CardListItem.classes = classes

export default CardListItem
