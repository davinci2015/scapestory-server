import React from 'react'
import { storiesOf } from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Icon from './Icon'
import IconButton from './IconButton'
import IconText from './IconText'

storiesOf('Atoms | Icon', module)
  .add('default', () => <Icon d={Icon.HEART}/>)
  .add('icon button', () => <IconButton onClick={() => action('Icon click')}><Icon d={Icon.HEART}/></IconButton>)
  .add('icon with text', () => <IconText icon={Icon.HEART} text='Some icon'/>)
  .add('icon with text small', () => <IconText size="small" icon={Icon.HEART} text='Some icon'/>)