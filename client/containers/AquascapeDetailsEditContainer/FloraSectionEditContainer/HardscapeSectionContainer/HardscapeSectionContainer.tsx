import React from 'react'
import {useMutation, useQuery} from 'react-apollo'

import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {
    updateAquascapeEditCache,
    AquascapeEditActions,
} from 'containers/AquascapeDetailsEditContainer/cache'
import {Icon, FormattedMessage} from 'components/atoms'
import {colors} from 'styles'
import FloraListEdit, {
    FloraEntityType,
} from 'components/sections/AquascapeDetails/FloraSection/FloraListEdit'
import {
    REMOVE_HARDSCAPE,
    ADD_HARDSCAPE,
} from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/HardscapeSectionContainer/mutations'
import {HARDSCAPE} from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer/HardscapeSectionContainer/queries'
import {ValueType} from 'react-select'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const HardscapeSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    if (!aquascape) return null

    const {data: hardscapeResult} = useQuery(HARDSCAPE)

    const [addHardscapeMutation] = useMutation(ADD_HARDSCAPE, {
        update: updateAquascapeEditCache(AquascapeEditActions.AQUASCAPE_ADD_HARDSCAPE, {
            aquascapeId: aquascape.id,
        }),
    })

    const [removeHardscapeMutation] = useMutation(REMOVE_HARDSCAPE, {
        update: updateAquascapeEditCache(AquascapeEditActions.AQUASCAPE_REMOVE_HARDSCAPE, {
            aquascapeId: aquascape.id,
        }),
    })

    const removeHardscape = (hardscapeId: number) => {
        removeHardscapeMutation({
            variables: {
                hardscapeId,
                aquascapeId: aquascape.id,
            },
        })
    }

    const onHardscapeSelect = (hardscape: ValueType<FloraEntityType>) => {
        if (!hardscape) return

        addHardscapeMutation({
            variables: {
                hardscapeId: (hardscape as FloraEntityType).id,
                aquascapeId: aquascape.id,
            },
        })
    }

    const onHardscapeCreate = (value: string) => {
        if (!value || value.trim() === '') return

        addHardscapeMutation({
            variables: {
                name: value.trim(),
                aquascapeId: aquascape.id,
            },
        })
    }

    return (
        <FloraListEdit
            icon={<Icon d={Icon.STONE} color={colors.WHITE} size={48} viewBox="0 0 48 48" />}
            title={
                <FormattedMessage
                    id="aquascape.flora_and_fauna.hardscape"
                    defaultMessage="Hardscape"
                />
            }
            noEntityText={
                <FormattedMessage
                    id="aquascape.flora_and_fauna.no_hardscape"
                    defaultMessage="No hardscape added"
                />
            }
            entities={aquascape.hardscape}
            allEntities={hardscapeResult?.hardscape}
            removeEntity={removeHardscape}
            onEntitySelect={onHardscapeSelect}
            onEntityCreate={onHardscapeCreate}
        />
    )
}

export default HardscapeSectionContainer
