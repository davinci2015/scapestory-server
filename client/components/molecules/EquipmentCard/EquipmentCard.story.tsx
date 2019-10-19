import React from 'react'
import {storiesOf} from '@storybook/react'

import EquipmentCard from './EquipmentCard'

storiesOf('Molecules | EquipmentCard', module)
  .add('default', () => (
    <div style={{maxWidth: 420}}>
      <EquipmentCard
        title="Filter"
        image={<img src="https://images.esellerpro.com/3164/I/108/06/BioMasterT_Gallery.png" alt="Filter" />}>
        <p>Filter Eheim 960 PRO</p>
        <p>Filter Eheim 960 PRO</p>
      </EquipmentCard>
    </div>
  ))