import React from 'react'
import {storiesOf} from '@storybook/react'

import Hero from 'components/sections/Hero/Hero'

storiesOf('Sections | Hero', module)
  .add('default', () => (
    <Hero 
      image="http://lorempixel.com/640/480/nature"
      title="Aquascape title"
      username="Jack Michael"
      tags={[{name: 'Nature'}, {name: 'Random'}]}
      topSection={<h1>Top section</h1>}
    />
  ))