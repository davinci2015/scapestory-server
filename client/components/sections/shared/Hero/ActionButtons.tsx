import React from 'react'

import {spaces} from 'styles'
import {Button} from 'components/atoms'

const classes = {
    root: 'action-buttons',
}

type ActionButtons = React.FunctionComponent & {
    classes: typeof classes
}

const ActionButtons: ActionButtons = ({children}) => (
    <>
        <div className="action-buttons">{children}</div>
        <style jsx>{`
            .action-buttons {
                display: flex;
                flex-wrap: wrap;
            }

            .action-buttons :global(.${Button.classes.root}) {
                margin: ${spaces.s8};
            }
        `}</style>
    </>
)

ActionButtons.classes = classes

export default ActionButtons
