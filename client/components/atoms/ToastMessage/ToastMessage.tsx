import React from 'react'

import {colors, spaces} from 'styles'
import Paragraph from '../Paragraph'
import Loader from '../Loader'

interface Props {
    showLoader?: boolean
}

const ToastMessage: React.FunctionComponent<Props> = ({children, showLoader}) => (
    <>
        <div className="message">
            {showLoader && <Loader />}
            <Paragraph color={colors.WHITE}>{children}</Paragraph>
        </div>
        <style jsx>{`
            .message {
                display: flex;
                align-items: center;
            }

            .message :global(.${Loader.classes.root}) {
                margin-right: ${spaces.s12};
            }
        `}</style>
    </>
)

export default ToastMessage
