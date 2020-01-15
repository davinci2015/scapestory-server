import React from 'react'
import EquipmentSectionEdit from 'components/sections/AquascapeDetails/EquipmentSectionEdit'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const EquipmentSectionEditContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    if (!aquascape) return null

    return (
        <EquipmentSectionEdit
            lights={aquascape.lights}
            filters={aquascape.filters}
            substrates={aquascape.substrates}
            additives={aquascape.additives}
            co2={aquascape.co2}
        />
    )
}

export default EquipmentSectionEditContainer
