import React from 'react'
import {Button} from '@material-ui/core'

type Props = {
    children: React.ReactNode
}

const MyButton = ({children, ...rest}: Props) => (
    <Button
        type="button"
        {...rest}>
        {children}
    </Button>
)

export default MyButton