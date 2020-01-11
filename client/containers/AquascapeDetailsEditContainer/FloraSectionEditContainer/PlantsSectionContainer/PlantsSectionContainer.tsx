import React, {ChangeEvent, useState} from 'react'
import {useMutation, useQuery} from 'react-apollo'

import {AquascapeDetailsQuery, PlantsQuery} from 'graphql/generated/queries'
import {Plant} from 'graphql/generated/types'
import {
    AddPlantMutation,
    AddPlantMutationVariables,
    RemovePlantMutation,
    RemovePlantMutationVariables,
} from 'graphql/generated/mutations'
import {PLANTS} from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/PlantsSectionContainer/queries'
import {
    ADD_PLANT,
    REMOVE_PLANT,
} from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/PlantsSectionContainer/mutations'
import {
    updateAquascapeEditCache,
    AquascapeEditActions,
} from 'containers/AquascapeDetailsEditContainer/cache'
import FloraListEdit from 'components/sections/AquascapeDetails/FloraSection/FloraListEdit'
import {Icon, FormattedMessage} from 'components/atoms'
import {colors} from 'styles'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const PlantsSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    const [plantInput, setPlantInput] = useState('')
    const [selectedPlant, setSelectedPlant] = useState<Pick<Plant, 'id' | 'name'> | null>()

    if (!aquascape) return null

    const {data: plantsResult} = useQuery<PlantsQuery>(PLANTS)

    const [addPlantMutation] = useMutation<AddPlantMutation, AddPlantMutationVariables>(ADD_PLANT, {
        update: updateAquascapeEditCache(AquascapeEditActions.AQUASCAPE_ADD_PLANT, {
            aquascapeId: aquascape.id,
        }),
    })

    const [removePlantMutation] = useMutation<RemovePlantMutation, RemovePlantMutationVariables>(
        REMOVE_PLANT,
        {
            update: updateAquascapeEditCache(AquascapeEditActions.AQUASCAPE_REMOVE_PLANT, {
                aquascapeId: aquascape.id,
            }),
        }
    )

    const onPlantInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPlantInput(e.target.value)
        setSelectedPlant(null)
    }

    const onPlantSelect = (value: string, plant: Pick<Plant, 'id' | 'name'>) => {
        setSelectedPlant(plant)
        setPlantInput(value)
    }

    const resetFields = () => {
        setSelectedPlant(null)
        setPlantInput('')
    }

    const addPlant = () => {
        if (!plantInput || plantInput === '') return
        const plantName = plantInput.trim()

        const plantId =
            selectedPlant && selectedPlant.name.toLowerCase() === plantName.toLowerCase()
                ? selectedPlant.id
                : undefined

        resetFields()
        addPlantMutation({
            variables: {
                plantId,
                name: plantName,
                aquascapeId: aquascape.id,
            },
        })
    }

    const removePlant = (plantId: number) => {
        removePlantMutation({
            variables: {
                plantId,
                aquascapeId: aquascape.id,
            },
        })
    }

    return (
        <FloraListEdit
            icon={<Icon d={Icon.PLANT} color={colors.WHITE} size={48} viewBox="0 0 48 48" />}
            title={
                <FormattedMessage id="aquascape.flora_and_fauna.plants" defaultMessage="Plant" />
            }
            noEntityText={
                <FormattedMessage
                    id="aquascape.flora_and_fauna.no_plants"
                    defaultMessage="No plants added"
                />
            }
            inputValue={plantInput}
            entities={aquascape.plants}
            allEntities={plantsResult?.plants}
            addEntity={addPlant}
            removeEntity={removePlant}
            onEntityInputChange={onPlantInputChange}
            onEntitySelect={onPlantSelect}
            addEntityText={
                <FormattedMessage
                    id="aquascape.flora_and_fauna.add_plant"
                    defaultMessage="Add plant"
                />
            }
        />
    )
}

export default PlantsSectionContainer
