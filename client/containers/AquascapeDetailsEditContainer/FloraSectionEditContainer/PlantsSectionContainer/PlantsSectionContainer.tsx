import React from 'react'
import {useMutation, useQuery} from 'react-apollo'

import {AquascapeDetailsQuery, PlantsQuery} from 'graphql/generated/queries'
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
import FloraListEdit, {
    FloraEntityType,
} from 'components/sections/AquascapeDetails/FloraSection/FloraListEdit'
import {Icon, FormattedMessage} from 'components/atoms'
import {colors} from 'styles'
import {ValueType} from 'react-select'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const PlantsSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
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

    const removePlant = (plantId: number) => {
        removePlantMutation({
            variables: {
                plantId,
                aquascapeId: aquascape.id,
            },
        })
    }

    const onPlantSelect = (plant: ValueType<FloraEntityType>) => {
        addPlantMutation({
            variables: {
                plantId: (plant as FloraEntityType).id,
                aquascapeId: aquascape.id,
            },
        })
    }

    const onPlantCreate = (value: string) => {
        if (!value || value.trim() === '') return

        addPlantMutation({
            variables: {
                name: value.trim(),
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
            entities={aquascape.plants}
            allEntities={plantsResult?.plants}
            removeEntity={removePlant}
            onEntityCreate={onPlantCreate}
            onEntitySelect={onPlantSelect}
        />
    )
}

export default PlantsSectionContainer
