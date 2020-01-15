import React from 'react'
import {ValueType} from 'react-select'
import {useMutation} from 'react-apollo'

import EquipmentSectionEdit from 'components/sections/AquascapeDetails/EquipmentSectionEdit'
import {
    AquascapeDetailsQuery,
    MutationAddEquipmentArgs,
    Equipment,
    MutationRemoveEquipmentArgs,
} from 'graphql/generated/queries'
import {EquipmentType} from 'graphql/generated/mutations'
import {Grid} from 'components/core'
import FilterEditContainer from './FilterEditContainer'
import {ADD_EQUIPMENT, REMOVE_EQUIPMENT} from './mutations'
import {updateAquascapeEquipmentCache, AquascapeEquipmentActions} from './cache'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

export interface EquipmentOptionType {
    value: number
    label: string
}

export interface EquipmentInterface {
    id: number
    model: string
    brand?: {
        id: number
        name: string
    }
}

const EquipmentSectionEditContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    if (!aquascape) return null

    const [addEquipmentMutation] = useMutation<Equipment, MutationAddEquipmentArgs>(ADD_EQUIPMENT)

    const [removeEquipmentMutation] = useMutation<Equipment, MutationRemoveEquipmentArgs>(
        REMOVE_EQUIPMENT
    )

    const onEquipmentSelect = (equipmentType: EquipmentType) => (
        selected: ValueType<EquipmentOptionType>
    ) => {
        if (!selected) return

        addEquipmentMutation({
            variables: {
                aquascapeId: aquascape.id,
                equipment: {
                    equipmentType,
                    equipmentId: (selected as EquipmentOptionType).value,
                },
            },
            update: updateAquascapeEquipmentCache(AquascapeEquipmentActions.ADD_EQUIPMENT, {
                equipmentType,
                aquascapeId: aquascape.id,
            }),
        })
    }

    const onEquipmentCreate = (equipmentType: EquipmentType) => (name: string) => {
        if (!name) return

        addEquipmentMutation({
            variables: {
                aquascapeId: aquascape.id,
                equipment: {
                    equipmentType,
                    name,
                },
            },
            update: updateAquascapeEquipmentCache(AquascapeEquipmentActions.ADD_EQUIPMENT, {
                equipmentType,
                aquascapeId: aquascape.id,
            }),
        })
    }

    const onEquipmentDelete = (equipmentType: EquipmentType) => (equipmentId: number) => {
        if (!equipmentId) return

        removeEquipmentMutation({
            variables: {
                aquascapeId: aquascape.id,
                equipment: {
                    equipmentType,
                    equipmentId,
                },
            },
            update: updateAquascapeEquipmentCache(AquascapeEquipmentActions.REMOVE_EQUIPMENT, {
                equipmentType,
                aquascapeId: aquascape.id,
            }),
        })
    }

    return (
        <EquipmentSectionEdit
            lights={aquascape.lights}
            substrates={aquascape.substrates}
            additives={aquascape.additives}
            co2={aquascape.co2}
        >
            <Grid.Row>
                <Grid.Item extraSmall={12} small={6} large={4}>
                    <FilterEditContainer
                        filters={aquascape.filters}
                        onFilterCreate={onEquipmentCreate(EquipmentType.Filter)}
                        onFilterSelect={onEquipmentSelect(EquipmentType.Filter)}
                        onFilterDelete={onEquipmentDelete(EquipmentType.Filter)}
                    />
                </Grid.Item>
            </Grid.Row>
        </EquipmentSectionEdit>
    )
}

export default EquipmentSectionEditContainer
