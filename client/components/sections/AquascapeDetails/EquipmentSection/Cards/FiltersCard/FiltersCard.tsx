import React from 'react'

import {FormattedMessage} from 'components/atoms'
import {EquipmentCard} from 'components/molecules'

interface Props {}

const FiltersCard: React.FunctionComponent<Props> = ({children}) => (
    <EquipmentCard
        title={<FormattedMessage id="aquascape.equipment.filtration" defaultMessage="Filtration" />}
        image={<img src="/static/equipment/filter.png" alt="Filter" />}
    >
        {children}
    </EquipmentCard>
)

export default FiltersCard
