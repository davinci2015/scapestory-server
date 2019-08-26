import React from 'react'
import { storiesOf } from '@storybook/react'

import IconText from './IconText'
import {Icon} from 'components/atoms'

storiesOf('IconText', module)
  .add('default', () => <IconText icon={Icon.HEART} text='Some icon'/>)