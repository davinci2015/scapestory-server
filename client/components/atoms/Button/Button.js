import React from 'react'
import {Button} from '@material-ui/core'

const MyButton = ({children, ...rest}) => (
    <Button
        type="button"
        {...rest}>
        {children}
    </Button>
)

export default MyButton