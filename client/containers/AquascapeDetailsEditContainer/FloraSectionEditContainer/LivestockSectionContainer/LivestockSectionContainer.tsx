import React, {ChangeEvent, useState} from 'react'
import {useMutation, useQuery} from 'react-apollo'

import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {Plant} from 'graphql/generated/types'
import {LIVESTOCK} from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/LivestockSectionContainer/queries'
import {
    updateAquascapeEditCache,
    AquascapeEditActions,
} from 'containers/AquascapeDetailsEditContainer/cache'
import {
    ADD_LIVESTOCK,
    REMOVE_LIVESTOCK,
} from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/LivestockSectionContainer/mutations'
import {Icon, FormattedMessage} from 'components/atoms'
import {colors} from 'styles'
import FloraListEdit from 'components/sections/AquascapeDetails/FloraSection/FloraListEdit'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const LivestockSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    const [livestockInput, setLivestockInput] = useState('')
    const [selectedLivestock, setSelectedLivestock] = useState<Pick<Plant, 'id' | 'name'> | null>()

    if (!aquascape) return null

    const {data: livestockResult} = useQuery(LIVESTOCK)

    const [addLivestockMutation] = useMutation(ADD_LIVESTOCK, {
        update: updateAquascapeEditCache(AquascapeEditActions.AQUASCAPE_ADD_LIVESTOCK, {
            aquascapeId: aquascape.id,
        }),
    })

    const [removeLivestockMutation] = useMutation(REMOVE_LIVESTOCK, {
        update: updateAquascapeEditCache(AquascapeEditActions.AQUASCAPE_REMOVE_LIVESTOCK, {
            aquascapeId: aquascape.id,
        }),
    })

    const onLivestockInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLivestockInput(e.target.value)
        setSelectedLivestock(null)
    }

    const onLivestockSelect = (value: string, plant: Pick<Plant, 'id' | 'name'>) => {
        setSelectedLivestock(plant)
        setLivestockInput(value)
    }

    const resetFields = () => {
        setSelectedLivestock(null)
        setLivestockInput('')
    }

    const addLivestock = () => {
        if (!livestockInput || livestockInput === '') return
        const livestockName = livestockInput.trim()

        const livestockId =
            selectedLivestock &&
            selectedLivestock.name.toLowerCase() === livestockName.toLowerCase()
                ? selectedLivestock.id
                : undefined

        resetFields()
        addLivestockMutation({
            variables: {
                livestockId,
                name: livestockName,
                aquascapeId: aquascape.id,
            },
        })
    }

    const removeLivestock = (livestockId: number) => {
        removeLivestockMutation({
            variables: {
                livestockId,
                aquascapeId: aquascape.id,
            },
        })
    }

    return (
        <FloraListEdit
            icon={<Icon d={Icon.FISH} color={colors.WHITE} size={48} viewBox="0 0 48 48" />}
            title={
                <FormattedMessage
                    id="aquascape.flora_and_fauna.livestock"
                    defaultMessage="Livestock"
                />
            }
            noEntityText={
                <FormattedMessage
                    id="aquascape.flora_and_fauna.no_livestock"
                    defaultMessage="No livestock added"
                />
            }
            inputValue={livestockInput}
            entities={aquascape.livestock}
            allEntities={livestockResult?.livestock}
            addEntity={addLivestock}
            removeEntity={removeLivestock}
            onEntityInputChange={onLivestockInputChange}
            onEntitySelect={onLivestockSelect}
            addEntityText={
                <FormattedMessage
                    id="aquascape.flora_and_fauna.add_livestock"
                    defaultMessage="Add livestock"
                />
            }
        />
    )
}

export default LivestockSectionContainer
