import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import InputAutocomplete from './InputAutocomplete'

storiesOf('Atoms | InputAutocomplete', module).add('default', () => (
    <InputAutocomplete
        value=""
        getItemValue={item => item.label}
        onChange={action('onChange')}
        onSelect={action('onSelect')}
        items={[{label: 'apple', random: 'lolo'}, {label: 'banana'}, {label: 'pear'}]}
        renderItem={(item, isHighlighted) => (
            <div style={{background: isHighlighted ? 'lightgray' : 'white'}}>{item.label}</div>
        )}
    />
))
