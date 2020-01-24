import React from 'react'

import {spaces} from 'styles'
import {Button} from 'components/atoms'

const ActionButtons: React.FunctionComponent = ({children}) => (
    <>
        <div className="action-buttons">{children}</div>
        <style jsx>{`
            .action-buttons {
                display: flex;
            }

            .action-buttons :global(.${Button.classes.root}) {
                margin-left: ${spaces.s18};
            }
        `}</style>
    </>
)

export default ActionButtons
