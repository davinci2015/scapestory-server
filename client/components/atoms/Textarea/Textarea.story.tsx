import React from 'react'
import {storiesOf} from '@storybook/react'

import Textarea from './Textarea'
import {InputAdornment, Button} from 'components/atoms'

storiesOf('Atoms | Textarea', module)
    .add('default', () => <Textarea placeholder="Enter your message" />)
    .add('with button inside', () => (
        <Textarea
            placeholder="Email"
            endAdornment={
                <InputAdornment>
                    <Button dimensions="small">Post comment</Button>
                </InputAdornment>
            }
        />
    ))
