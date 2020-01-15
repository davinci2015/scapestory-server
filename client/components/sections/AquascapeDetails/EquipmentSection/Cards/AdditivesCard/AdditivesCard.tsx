import React from 'react'

import {FormattedMessage} from 'components/atoms'
import {EquipmentCard} from 'components/molecules'

interface Props {}

const AdditivesCard: React.FunctionComponent<Props> = ({children}) => (
    <EquipmentCard
        title={<FormattedMessage id="aquascape.equipment.additives" defaultMessage="Additives" />}
        image={<img src="/static/equipment/filter.png" alt="Filter" />}
    >
        {children}
    </EquipmentCard>
)

export default AdditivesCard
