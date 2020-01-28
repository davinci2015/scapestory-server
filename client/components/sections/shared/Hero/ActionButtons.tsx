import React from 'react'

import {spaces, media} from 'styles'
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
                margin-top: ${spaces.s12};
                margin-left: -${spaces.s8};
            }

            .action-buttons :global(.${Button.classes.root}) {
                margin: ${spaces.s8};
            }

            @media ${media.up('medium')} {
                .action-buttons {
                    margin: -${spaces.s8} -${spaces.s8} 0 0;
                }
            }
        `}</style>
    </>
)

ActionButtons.classes = classes

export default ActionButtons
