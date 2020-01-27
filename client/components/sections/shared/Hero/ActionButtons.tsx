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
            }

            .action-buttons :global(.${Button.classes.root}) {
                margin-left: ${spaces.s8};
                margin-right: ${spaces.s8};
            }
        `}</style>
    </>
)

ActionButtons.classes = classes

export default ActionButtons
