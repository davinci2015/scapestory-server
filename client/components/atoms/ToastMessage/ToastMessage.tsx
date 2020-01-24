import React from 'react'

import {colors} from 'styles'
import Paragraph from '../Paragraph'

interface Props {}

const ToastMessage: React.FunctionComponent<Props> = ({children}) => (
    <>
        <Paragraph color={colors.WHITE}>{children}</Paragraph>
        <style jsx>{``}</style>
    </>
)

export default ToastMessage
