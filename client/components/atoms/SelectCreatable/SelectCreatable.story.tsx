import React from 'react'
import {storiesOf} from '@storybook/react'

import SelectCreatable from './SelectCreatable'

storiesOf('Atoms | SelectCreatable', module).add('default', () => (
    <SelectCreatable
        onChange={option => option}
        options={[
            {value: 'random', label: 'random'},
            {value: 'second', label: 'second'},
        ]}
    />
))
