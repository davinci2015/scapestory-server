import React from 'react'
import {storiesOf} from '@storybook/react'

import Input from './Input'
import {Icon, InputAdornment} from 'components/atoms'

storiesOf('Atoms | Input', module)
    .add('default', () => <Input placeholder="Email" label="Email" />)
    .add('with end adornment', () => (
        <Input
            label="Email"
            placeholder="Email"
            endAdornment={
                <InputAdornment>
                    <Icon viewBox="0 0 48 48" d={Icon.EYE_SHOW} />
                </InputAdornment>
            }
        />
    ))
