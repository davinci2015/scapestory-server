import React, {ChangeEvent, useState} from 'react'
import {useMutation, useQuery} from 'react-apollo'

import {AquascapeDetailsQuery, PlantsQuery} from 'graphql/generated/queries'
import {REMOVE_COMMENT} from 'containers/AquascapeDetailsContainer/CommentsContainer/mutations'
import {Plant} from 'graphql/generated/types'
import {
    AddPlantMutation,
    AddPlantMutationVariables,
    RemovePlantMutation,
    RemovePlantMutationVariables,
} from 'graphql/generated/mutations'
import PlantsList from 'components/sections/AquascapeDetails/FloraSection/PlantsList'
import {PLANTS} from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/PlantsSectionContainer/queries'
import {ADD_PLANT} from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/PlantsSectionContainer/mutations'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const PlantsSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    const [plantInput, setPlantInput] = useState('')
    const [selectedPlant, setSelectedPlant] = useState<Pick<Plant, 'id' | 'name'> | null>()

    if (!aquascape) return null

    const {data: plantsResult} = useQuery<PlantsQuery>(PLANTS)
    const [addPlantMutation] = useMutation<AddPlantMutation, AddPlantMutationVariables>(ADD_PLANT)
    const [removePlantMutation] = useMutation<RemovePlantMutation, RemovePlantMutationVariables>(
        REMOVE_COMMENT
    )

    const onPlantInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPlantInput(e.target.value)
        setSelectedPlant(null)
    }

    const onPlantSelect = (value: string, plant: Pick<Plant, 'id' | 'name'>) => {
        setSelectedPlant(plant)
        setPlantInput(value)
    }

    const addPlant = () => {
        if (!plantInput || plantInput === '') return
        const plantName = plantInput.trim()

        const plantId =
            selectedPlant && selectedPlant.name.toLowerCase() === plantName.toLowerCase()
                ? selectedPlant.id
                : undefined

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
        <PlantsList
            edit
            addPlant={addPlant}
            removePlant={removePlant}
            plants={aquascape.plants}
            allPlants={plantsResult?.plants}
            onPlantInputChange={onPlantInputChange}
            onPlantSelect={onPlantSelect}
            plantInputValue={plantInput}
        />
    )
}

export default PlantsSectionContainer
