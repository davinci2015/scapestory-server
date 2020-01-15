import React from 'react'
import {useMutation, useQuery} from 'react-apollo'

import {AquascapeDetailsQuery} from 'graphql/generated/queries'
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
import FloraListEdit, {
    FloraEntityType,
} from 'components/sections/AquascapeDetails/FloraSection/FloraListEdit'
import {ValueType} from 'react-select'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const LivestockSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
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

    const removeLivestock = (livestockId: number) => {
        removeLivestockMutation({
            variables: {
                livestockId,
                aquascapeId: aquascape.id,
            },
        })
    }

    const onLivestockSelect = (livestock: ValueType<FloraEntityType>) => {
        addLivestockMutation({
            variables: {
                livestockId: (livestock as FloraEntityType).id,
                aquascapeId: aquascape.id,
            },
        })
    }

    const onLivestockCreate = (value: string) => {
        if (!value || value.trim() === '') return

        addLivestockMutation({
            variables: {
                name: value.trim(),
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
            entities={aquascape.livestock}
            allEntities={livestockResult?.livestock}
            removeEntity={removeLivestock}
            onEntitySelect={onLivestockSelect}
            onEntityCreate={onLivestockCreate}
        />
    )
}

export default LivestockSectionContainer
